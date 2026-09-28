#!/usr/bin/env python3
from __future__ import annotations
import struct
import zlib
from collections import Counter
from pathlib import Path

PNG=Path("assets/vertex-logo.png")
data=PNG.read_bytes()
assert data[:8]==b"\x89PNG\r\n\x1a\n"
pos=8
width=height=bit_depth=color_type=interlace=None
idat=[]
palette=None
transparency=None
while pos < len(data):
    length=struct.unpack(">I",data[pos:pos+4])[0]; pos+=4
    kind=data[pos:pos+4]; pos+=4
    chunk=data[pos:pos+length]; pos+=length
    pos+=4
    if kind==b"IHDR":
        width,height,bit_depth,color_type,_,_,interlace=struct.unpack(">IIBBBBB",chunk)
    elif kind==b"IDAT":
        idat.append(chunk)
    elif kind==b"PLTE":
        palette=[tuple(chunk[i:i+3]) for i in range(0,len(chunk),3)]
    elif kind==b"tRNS":
        transparency=list(chunk)
    elif kind==b"IEND":
        break

if bit_depth != 8 or interlace != 0:
    raise SystemExit(f"Unsupported PNG format: bit_depth={bit_depth}, interlace={interlace}")

channels={0:1,2:3,3:1,4:2,6:4}[color_type]
bpp=channels
raw=zlib.decompress(b"".join(idat))
stride=width*channels
rows=[]
offset=0
prev=bytearray(stride)

def paeth(a,b,c):
    p=a+b-c
    pa=abs(p-a); pb=abs(p-b); pc=abs(p-c)
    if pa<=pb and pa<=pc: return a
    if pb<=pc: return b
    return c

for _ in range(height):
    f=raw[offset]; offset+=1
    scan=bytearray(raw[offset:offset+stride]); offset+=stride
    recon=bytearray(stride)
    for i,x in enumerate(scan):
        a=recon[i-bpp] if i>=bpp else 0
        b=prev[i]
        c=prev[i-bpp] if i>=bpp else 0
        if f==0: val=x
        elif f==1: val=(x+a)&255
        elif f==2: val=(x+b)&255
        elif f==3: val=(x+((a+b)//2))&255
        elif f==4: val=(x+paeth(a,b,c))&255
        else: raise SystemExit(f"Unsupported PNG filter {f}")
        recon[i]=val
    rows.append(recon)
    prev=recon

colors=Counter()
for row in rows:
    for i in range(0,len(row),channels):
        if color_type==6:
            r,g,b,a=row[i:i+4]
        elif color_type==2:
            r,g,b=row[i:i+3]; a=255
        elif color_type==3:
            idx=row[i]
            r,g,b=palette[idx]
            a=transparency[idx] if transparency and idx < len(transparency) else 255
        elif color_type==4:
            v,a=row[i:i+2]; r=g=b=v
        else:
            v=row[i]; r=g=b=v; a=255
        if a < 245:
            continue
        if r>=248 and g>=248 and b>=248:
            continue
        colors[(r,g,b)] += 1

print(f"Logo {width}x{height} type={color_type} exact opaque colors={len(colors)}")
for (r,g,b),count in colors.most_common(16):
    print(f"LOGO_COLOR #{r:02X}{g:02X}{b:02X} {count}")
