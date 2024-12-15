import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const Countdown = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date("December 25, 2024");
    const now = new Date();
    const difference = targetDate - now;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem', justifyContent: 'center' }}>
      <img 
        src="https://cdn.dribbble.com/users/1738955/screenshots/9133723/media/fb2d9746f813c0be8f8d8ab50d2dbf97.gif" 
        alt="Christmas GIF"
        style={{
          display: 'block',
          margin: '-9rem',
          maxWidth: '100%',
          width: '700px',
          height: 'auto',
          borderRadius: '16px',
        }}
      />
      <div style={{ 
        display: 'flex', 
        gap: '1.5rem', 
        justifyContent: 'center',
        color: '#ffffff',
        fontFamily: 'Inter, sans-serif',
        marginTop: '3rem',
        flexWrap: 'wrap',
        maxWidth: '100%',
        padding: '0 1rem'
      }}>
        <TimeBox value={String(timeLeft.days).padStart(2, '0')} label="DÍAS" color="#FF6B6B" />
        <TimeBox value={String(timeLeft.hours).padStart(2, '0')} label="HORAS" color="#4ECDC4" />
        <TimeBox value={String(timeLeft.minutes).padStart(2, '0')} label="MINUTOS" color="#FFE66D" />
        <TimeBox value={String(timeLeft.seconds).padStart(2, '0')} label="SEGUNDOS" color="#FF8C42" />
      </div>
    </div>
  );
};

const TimeBox = ({ value, label, color }) => (
  <div style={{
    background: '#2b2f4d',
    padding: 'clamp(1rem, 2vw, 2rem)',
    borderRadius: '16px',
    minWidth: 'clamp(100px, 20vw, 120px)',
    textAlign: 'center',
    border: `1px solid ${color}`,
    transition: 'all 0.3s ease',
    transform: 'translateY(0)',
    ':hover': {
      transform: 'translateY(-5px)'
    }
  }}>
    <div style={{
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      fontWeight: 'bold',
      color: color,
      fontFamily: 'Space Mono, monospace'
    }}>
      {value}
    </div>
    <div style={{
      fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
      color: '#ffffff',
      marginTop: '0.75rem',
      letterSpacing: '0.1em',
      fontWeight: '600'
    }}>
      {label}
    </div>
  </div>
);

TimeBox.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};

export default Countdown;