"use client";
import React from "react";

const LiveFleetChart: React.FC = () => {
  // Sample data for the fleet chart
  const data = [
    { time: "00:00", active: 150, standby: 80 },
    { time: "02:00", active: 120, standby: 60 },
    { time: "04:00", active: 100, standby: 90 },
    { time: "06:00", active: 180, standby: 120 },
    { time: "08:00", active: 250, standby: 150 },
    { time: "10:00", active: 280, standby: 140 },
    { time: "12:00", active: 320, standby: 160 },
    { time: "14:00", active: 290, standby: 170 },
    { time: "16:00", active: 310, standby: 180 },
    { time: "18:00", active: 280, standby: 150 },
    { time: "20:00", active: 220, standby: 130 },
    { time: "22:00", active: 180, standby: 100 },
  ];

  const maxValue = Math.max(...data.map((d) => Math.max(d.active, d.standby)));
  const width = 600;
  const height = 250;
  const padding = 40;
  const chartWidth = width - 2 * padding;
  const chartHeight = height - 2 * padding;

  // Create points for active fleet
  const activePoints = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * chartWidth;
    const y = padding + chartHeight - (d.active / maxValue) * chartHeight;
    return { x, y, value: d.active, time: d.time };
  });

  // Create points for standby fleet
  const standbyPoints = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * chartWidth;
    const y = padding + chartHeight - (d.standby / maxValue) * chartHeight;
    return { x, y, value: d.standby, time: d.time };
  });

  // Create path for active area
  const activePathData = activePoints.reduce((path, point, i) => {
    if (i === 0) {
      return `M ${point.x} ${height - padding} L ${point.x} ${point.y}`;
    }
    return `${path} L ${point.x} ${point.y}`;
  }, "");
  const activeClosedPath = `${activePathData} L ${
    activePoints[activePoints.length - 1].x
  } ${height - padding} Z`;

  // Create path for standby area
  const standbyPathData = standbyPoints.reduce((path, point, i) => {
    if (i === 0) {
      return `M ${point.x} ${height - padding} L ${point.x} ${point.y}`;
    }
    return `${path} L ${point.x} ${point.y}`;
  }, "");
  const standbyClosedPath = `${standbyPathData} L ${
    standbyPoints[standbyPoints.length - 1].x
  } ${height - padding} Z`;

  return (
    <div style={{ width: "100%", height: `${height}px` }}>
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <linearGradient id="activeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00ff88" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00ff88" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient
            id="standbyGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#00ff88" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00ff88" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
          <line
            key={i}
            x1={padding}
            y1={padding + ratio * chartHeight}
            x2={width - padding}
            y2={padding + ratio * chartHeight}
            stroke="#2a3f54"
            strokeWidth="1"
            strokeOpacity="0.2"
          />
        ))}

        {/* Standby area (behind active) */}
        <path d={standbyClosedPath} fill="url(#standbyGradient)" />

        {/* Active area */}
        <path d={activeClosedPath} fill="url(#activeGradient)" />

        {/* Standby line */}
        <path
          d={standbyPathData}
          fill="none"
          stroke="#00ff88"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Active line */}
        <path
          d={activePathData}
          fill="none"
          stroke="#00ff88"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points for active */}
        {activePoints.map((point, i) => (
          <circle
            key={`active-${i}`}
            cx={point.x}
            cy={point.y}
            r="3"
            fill="#00ff88"
            stroke="#1a2332"
            strokeWidth="2"
          />
        ))}

        {/* Data points for standby */}
        {standbyPoints.map((point, i) => (
          <circle
            key={`standby-${i}`}
            cx={point.x}
            cy={point.y}
            r="2"
            fill="#00ff88"
            stroke="#1a2332"
            strokeWidth="1"
          />
        ))}

        {/* X-axis labels (every 4 hours) */}
        {data
          .filter((_, i) => i % 2 === 0)
          .map((d, i) => {
            const actualIndex = i * 2;
            const point = activePoints[actualIndex];
            return (
              <text
                key={i}
                x={point.x}
                y={height - 10}
                textAnchor="middle"
                fontSize="11"
                fill="#888"
              >
                {d.time}
              </text>
            );
          })}

        {/* Y-axis labels */}
        {[0, 0.5, 1].map((ratio, i) => {
          const value = Math.round(ratio * maxValue);
          return (
            <text
              key={i}
              x={10}
              y={padding + (1 - ratio) * chartHeight + 4}
              fontSize="11"
              fill="#888"
            >
              {value}
            </text>
          );
        })}

        {/* Current time indicator */}
        <line
          x1={activePoints[8].x}
          y1={padding}
          x2={activePoints[8].x}
          y2={height - padding}
          stroke="#00ff88"
          strokeWidth="2"
          strokeDasharray="4,4"
          strokeOpacity="0.6"
        />

        {/* Current time label */}
        <text
          x={activePoints[8].x}
          y={padding - 10}
          textAnchor="middle"
          fontSize="10"
          fill="#00ff88"
          fontWeight="600"
        >
          Now
        </text>
      </svg>
    </div>
  );
};

export default LiveFleetChart;
