'use client'

export default function AutomationPatterns() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Animated grid pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-5"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Flowing nodes animation */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-secondary rounded-full opacity-0 animate-pulse"
        style={{
          animation: 'float 6s ease-in-out infinite',
          animationDelay: '0s'
        }}
      />
      <div className="absolute top-32 left-1/4 w-1.5 h-1.5 bg-secondary/60 rounded-full opacity-0"
        style={{
          animation: 'flow 8s ease-in-out infinite',
          animationDelay: '1s'
        }}
      />
      <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-accent rounded-full opacity-0"
        style={{
          animation: 'float 7s ease-in-out infinite',
          animationDelay: '2s'
        }}
      />
      
      {/* Process flow lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03]"
        preserveAspectRatio="none"
      >
        {/* Horizontal connections */}
        <line x1="5%" y1="25%" x2="30%" y2="25%" stroke="currentColor" strokeWidth="1" />
        <line x1="35%" y1="25%" x2="60%" y2="25%" stroke="currentColor" strokeWidth="1" />
        <line x1="65%" y1="25%" x2="95%" y2="25%" stroke="currentColor" strokeWidth="1" />
        
        {/* Vertical connections */}
        <line x1="30%" y1="25%" x2="30%" y2="50%" stroke="currentColor" strokeWidth="1" />
        <line x1="60%" y1="25%" x2="60%" y2="60%" stroke="currentColor" strokeWidth="1" />
        
        {/* Diagonal flows */}
        <line x1="10%" y1="60%" x2="40%" y2="80%" stroke="currentColor" strokeWidth="1" />
        <line x1="70%" y1="45%" x2="85%" y2="75%" stroke="currentColor" strokeWidth="1" />
        
        {/* Process nodes */}
        <circle cx="30%" cy="25%" r="2" fill="currentColor" opacity="0.3" />
        <circle cx="60%" cy="25%" r="2" fill="currentColor" opacity="0.3" />
        <circle cx="30%" cy="50%" r="2" fill="currentColor" opacity="0.3" />
        <circle cx="60%" cy="60%" r="2" fill="currentColor" opacity="0.3" />
      </svg>

      {/* Animated flow along path */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.04 }}
      >
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(190, 100%, 50%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(190, 100%, 50%)" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(190, 100%, 50%)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Main workflow path */}
        <path
          d="M 50 20 Q 150 80 250 60 T 450 100"
          fill="none"
          stroke="url(#flowGradient)"
          strokeWidth="2"
          opacity="0.6"
          style={{
            animation: 'dashflow 8s linear infinite'
          }}
          strokeDasharray="100,100"
        />

        {/* Secondary paths */}
        <path
          d="M 100 200 L 300 250 L 500 200"
          fill="none"
          stroke="hsl(190, 100%, 50%)"
          strokeWidth="1"
          opacity="0.3"
          style={{
            animation: 'dashflow 10s linear infinite',
            animationDirection: 'reverse'
          }}
          strokeDasharray="80,80"
        />

        <path
          d="M 200 350 Q 400 300 600 350"
          fill="none"
          stroke="hsl(190, 100%, 50%)"
          strokeWidth="1"
          opacity="0.2"
          style={{
            animation: 'dashflow 12s linear infinite'
          }}
          strokeDasharray="60,60"
        />
      </svg>

      {/* Pulses at key points */}
      <div className="absolute" style={{ top: '25%', left: '30%', width: '4px', height: '4px' }}>
        <div
          className="absolute w-full h-full bg-secondary rounded-full"
          style={{
            animation: 'pulse-ring 2s ease-out infinite',
            boxShadow: '0 0 0 rgba(0, 200, 255, 0.7)'
          }}
        />
      </div>

      <div className="absolute" style={{ top: '50%', left: '60%', width: '4px', height: '4px' }}>
        <div
          className="absolute w-full h-full bg-accent rounded-full"
          style={{
            animation: 'pulse-ring 2.5s ease-out infinite',
            animationDelay: '0.5s',
            boxShadow: '0 0 0 rgba(0, 200, 255, 0.7)'
          }}
        />
      </div>

      {/* Animated accent elements */}
      <div
        className="absolute w-32 h-32 border border-secondary/10 rounded-lg"
        style={{
          top: '15%',
          right: '10%',
          animation: 'rotate-slow 30s linear infinite',
        }}
      />

      <div
        className="absolute w-24 h-24 border border-secondary/5 rounded"
        style={{
          bottom: '20%',
          left: '5%',
          animation: 'rotate-slow 40s linear infinite reverse',
        }}
      />

      <style>{`
        @keyframes float {
          0%, 100% {
            opacity: 0;
            transform: translateY(0px) translateX(0px);
          }
          50% {
            opacity: 0.4;
            transform: translateY(-30px) translateX(20px);
          }
        }

        @keyframes flow {
          0%, 100% {
            opacity: 0;
            transform: translateY(0px);
          }
          50% {
            opacity: 0.6;
            transform: translateY(-50px);
          }
        }

        @keyframes dashflow {
          0% {
            strokeDashoffset: 200;
          }
          100% {
            strokeDashoffset: 0;
          }
        }

        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 1;
            boxShadow: 0 0 0 0 rgba(0, 200, 255, 0.7);
          }
          100% {
            transform: scale(2);
            opacity: 0;
            boxShadow: 0 0 0 10px rgba(0, 200, 255, 0);
          }
        }

        @keyframes rotate-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}
