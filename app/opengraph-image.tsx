import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'ClawMore | Autonomous Infrastructure Evolution';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: '#0a0a0a',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '60px',
        border: '2px solid #bc00ff33',
      }}
    >
      {/* Background Grid/Noise Effect */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle at 50% 50%, #bc00ff11 0%, transparent 70%)',
          opacity: 0.5,
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          zIndex: 10,
        }}
      >
        {/* Logo Placeholder - in a real env we'd use the fetched logoData */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '120px',
            height: '120px',
            background: 'rgba(188, 0, 255, 0.1)',
            border: '2px solid #bc00ff',
            borderRadius: '24px',
            marginBottom: '20px',
          }}
        >
          <svg
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#bc00ff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontSize: '72px',
              fontWeight: '900',
              color: 'white',
              marginBottom: '16px',
              letterSpacing: '-0.05em',
              fontStyle: 'italic',
              display: 'flex',
            }}
          >
            Claw<span style={{ color: '#bc00ff' }}>More</span>
          </h1>
          <p
            style={{
              fontSize: '32px',
              color: '#ededed',
              maxWidth: '800px',
              opacity: 0.8,
              fontWeight: '300',
            }}
          >
            Autonomous Infrastructure Evolution
          </p>
        </div>

        <div
          style={{
            marginTop: '40px',
            display: 'flex',
            gap: '16px',
          }}
        >
          <div
            style={{
              padding: '8px 16px',
              background: 'rgba(0, 224, 255, 0.1)',
              border: '1px solid rgba(0, 224, 255, 0.3)',
              borderRadius: '4px',
              color: '#00e0ff',
              fontSize: '14px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
            }}
          >
            Real-time Synthesis
          </div>
          <div
            style={{
              padding: '8px 16px',
              background: 'rgba(0, 255, 163, 0.1)',
              border: '1px solid rgba(0, 255, 163, 0.3)',
              borderRadius: '4px',
              color: '#00ffa3',
              fontSize: '14px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
            }}
          >
            Self-Healing
          </div>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          width: 40,
          height: 2,
          background: '#bc00ff',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          width: 2,
          height: 40,
          background: '#bc00ff',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          width: 40,
          height: 2,
          background: '#bc00ff',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          width: 2,
          height: 40,
          background: '#bc00ff',
        }}
      />
    </div>,
    {
      ...size,
    }
  );
}
