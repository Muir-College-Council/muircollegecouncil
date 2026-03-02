import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

export default async function Icon() {
  const filePath = path.join(process.cwd(), 'public', 'muir-logo.jpeg');
  const buf = await readFile(filePath);
  const src = `data:image/jpeg;base64,${buf.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0)',
          borderRadius: 9999,
          overflow: 'hidden',
        }}
      >
        <img
          src={src}
          alt="Muir College Council"
          width={32}
          height={32}
          style={{
            width: 32,
            height: 32,
            objectFit: 'cover',
          }}
        />
      </div>
    ),
    size,
  );
}
