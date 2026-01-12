import React, { useState } from 'react';
import { useAppContext } from '../services/AppContext';
import { TIME_SLOTS } from '../constants';
import { Calendar, Clock, Users, Check, ChevronLeft, MapPin } from 'lucide-react';
import { RestaurantSettings } from '../types';

// Allow passing settings as a prop for the Preview mode in Editor
interface BookingPageProps {
  customSettings?: RestaurantSettings;
  previewMode?: boolean;
}

export const BookingPage: React.FC<BookingPageProps> = ({ customSettings, previewMode = false }) => {
  const context = useAppContext();
  // Use custom settings if provided (Editor), otherwise global settings
  const settings = customSettings || context.settings;
  const addReservation = context.addReservation;
  
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [partySize, setPartySize] = useState<number>(2);
  const [guestDetails, setGuestDetails] = useState({ name: '', email: '', phone: '', notes: '' });

  // Styles derived from settings
  const { design } = settings;
  
  const pageStyle: React.CSSProperties = {
    fontFamily: design.fontFamily,
    backgroundColor: design.backgroundColor,
    color: design.textColor,
  };

  const primaryGradient = `linear-gradient(135deg, ${design.primaryColor} 0%, ${design.secondaryColor} 100%)`;
  
  const buttonStyle: React.CSSProperties = {
    background: primaryGradient,
    borderRadius: `${design.cornerRadius}px`,
    color: '#ffffff',
  };
  
  const cardStyle: React.CSSProperties = {
    borderRadius: `${design.cornerRadius + 4}px`,
    borderColor: 'rgba(255,255,255,0.1)',
  };

  const selectionStyle = (isSelected: boolean): React.CSSProperties => {
    return isSelected 
      ? { background: design.primaryColor, borderColor: design.primaryColor, color: '#ffffff', borderRadius: `${design.cornerRadius}px` }
      : { background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: design.textColor, borderRadius: `${design.cornerRadius}px` };
  };

  const heroHeightClass = 
    design.heroHeight === 'compact' ? 'h-48 md:h-64' :
    design.heroHeight === 'large' ? 'h-80 md:h-[500px]' : 
    'h-64 md:h-80';

  const handleBook = () => {
    if (previewMode) {
      alert("This is a preview. No reservation will be created.");
      return;
    }

    addReservation({
      id: `r${Date.now()}`,
      customerId: `temp-${Date.now()}`,
      customerName: guestDetails.name,
      date: date || new Date().toISOString().split('T')[0],
      time: time,
      partySize: partySize,
      status: 'pending',
      notes: guestDetails.notes
    });
    setStep(3);
  };

  const dates = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d);
  }

  return (
    <div className="min-h-screen font-sans selection:bg-indigo-500/30" style={pageStyle}>
      <link href={`https://fonts.googleapis.com/css2?family=${design.fontFamily.replace(' ', '+')}:wght@300;400;500;600;700&display=swap`} rel="stylesheet" />
      
      {/* Hero Section */}
      <div className={`relative w-full overflow-hidden ${heroHeightClass}`}>
        <div 
          className="absolute inset-0 z-10" 
          style={{ background: `linear-gradient(to top, ${design.backgroundColor} 0%, transparent 100%)` }} 
        />
        <div 
          className="absolute inset-0 bg-black z-0" 
          style={{ opacity: design.heroOverlayOpacity }} 
        />
        <img 
          src={settings.coverUrl} 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
        <div className={`absolute bottom-0 left-0 w-full p-6 md:p-12 z-20 flex flex-col justify-end ${design.heroAlignment === 'center' ? 'items-center text-center' : 'items-start text-left'}`}>
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-2 tracking-tight" style={{ color: design.textColor }}>{settings.name}</h1>
            {design.heroAlignment === 'center' ? (
                <div className="flex items-center justify-center gap-2" style={{ color: design.textColor, opacity: 0.8 }}>
                    <MapPin size={16} /> {settings.address}
                </div>
            ) : (
                <div className="flex items-center gap-2" style={{ color: design.textColor, opacity: 0.8 }}>
                    <MapPin size={16} /> {settings.address}
                </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto -mt-10 px-4 pb-20 relative z-30">
        <div 
            className="backdrop-blur-xl shadow-2xl p-6 md:p-8"
            style={{ 
                background: 'rgba(255, 255, 255, 0.03)', 
                border: '1px solid rgba(255, 255, 255, 0.08)',
                ...cardStyle
            }}
        >
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium mb-3 uppercase tracking-wider" style={{ color: design.textColor, opacity: 0.7 }}>Select Date</label>
                <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
                  {dates.map((d, i) => {
                    const dateStr = d.toISOString().split('T')[0];
                    const isSelected = date === dateStr;
                    return (
                      <button
                        key={i}
                        onClick={() => setDate(dateStr)}
                        className="min-w-[80px] p-3 border transition-all flex flex-col items-center justify-center gap-1 hover:brightness-110"
                        style={selectionStyle(isSelected)}
                      >
                        <span className="text-xs uppercase font-bold">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                        <span className="text-xl font-bold">{d.getDate()}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Party Size */}
               <div>
                <label className="block text-sm font-medium mb-3 uppercase tracking-wider" style={{ color: design.textColor, opacity: 0.7 }}>Party Size</label>
                <div className="flex gap-3 overflow-x-auto">
                  {[2, 3, 4, 5, 6, 8].map((num) => (
                    <button
                      key={num}
                      onClick={() => setPartySize(num)}
                      className="w-12 h-12 border transition-all flex items-center justify-center font-bold hover:brightness-110"
                      style={selectionStyle(partySize === num)}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-sm font-medium mb-3 uppercase tracking-wider" style={{ color: design.textColor, opacity: 0.7 }}>Available Times</label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                  {TIME_SLOTS.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTime(t)}
                      className="py-2 text-sm font-medium transition-all hover:brightness-110"
                      style={selectionStyle(time === t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                disabled={!date || !time}
                onClick={() => setStep(2)}
                className="w-full py-4 font-bold text-lg shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-95"
                style={buttonStyle}
              >
                Continue Details
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
               <button onClick={() => setStep(1)} className="flex items-center gap-1 text-sm mb-4 hover:opacity-100 opacity-60 transition-opacity" style={{ color: design.textColor }}>
                <ChevronLeft size={16} /> Back to selection
              </button>
              
              <div className="p-4 rounded-xl border flex justify-between items-center mb-6" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
                <div>
                   <p className="text-xs uppercase opacity-60" style={{ color: design.textColor }}>Reservation For</p>
                   <p className="font-semibold text-lg" style={{ color: design.textColor }}>{date} at {time}</p>
                </div>
                <div className="text-right">
                   <p className="text-xs uppercase opacity-60" style={{ color: design.textColor }}>Guests</p>
                   <p className="font-semibold text-lg" style={{ color: design.textColor }}>{partySize} People</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm opacity-60" style={{ color: design.textColor }}>Full Name</label>
                  <input
                    type="text"
                    className="w-full p-3 focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                        background: 'rgba(0,0,0,0.2)', 
                        border: '1px solid rgba(255,255,255,0.1)', 
                        color: design.textColor,
                        borderRadius: `${design.cornerRadius}px`,
                        borderColor: design.primaryColor 
                    }}
                    placeholder="John Doe"
                    value={guestDetails.name}
                    onChange={(e) => setGuestDetails({...guestDetails, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm opacity-60" style={{ color: design.textColor }}>Phone Number</label>
                    <input
                      type="tel"
                      className="w-full p-3 focus:outline-none focus:ring-2 transition-all"
                      style={{ 
                        background: 'rgba(0,0,0,0.2)', 
                        border: '1px solid rgba(255,255,255,0.1)', 
                        color: design.textColor,
                        borderRadius: `${design.cornerRadius}px`,
                        borderColor: design.primaryColor 
                      }}
                      placeholder="(555) 000-0000"
                      value={guestDetails.phone}
                      onChange={(e) => setGuestDetails({...guestDetails, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm opacity-60" style={{ color: design.textColor }}>Email Address</label>
                    <input
                      type="email"
                      className="w-full p-3 focus:outline-none focus:ring-2 transition-all"
                      style={{ 
                        background: 'rgba(0,0,0,0.2)', 
                        border: '1px solid rgba(255,255,255,0.1)', 
                        color: design.textColor,
                        borderRadius: `${design.cornerRadius}px`,
                        borderColor: design.primaryColor 
                      }}
                      placeholder="john@example.com"
                      value={guestDetails.email}
                      onChange={(e) => setGuestDetails({...guestDetails, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm opacity-60" style={{ color: design.textColor }}>Special Requests (Optional)</label>
                  <textarea
                    rows={2}
                    className="w-full p-3 focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                        background: 'rgba(0,0,0,0.2)', 
                        border: '1px solid rgba(255,255,255,0.1)', 
                        color: design.textColor,
                        borderRadius: `${design.cornerRadius}px`,
                        borderColor: design.primaryColor 
                    }}
                    placeholder="Allergies, anniversary, etc."
                    value={guestDetails.notes}
                    onChange={(e) => setGuestDetails({...guestDetails, notes: e.target.value})}
                  />
                </div>
              </div>

               <button 
                disabled={!guestDetails.name || !guestDetails.phone}
                onClick={handleBook}
                className="w-full py-4 font-bold text-lg shadow-xl mt-6 disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-95"
                style={buttonStyle}
              >
                Confirm Reservation
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-12 animate-in zoom-in duration-500">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}
              >
                <Check size={40} strokeWidth={3} />
              </div>
              <h2 className="text-3xl font-bold mb-2" style={{ color: design.textColor }}>Booking Confirmed!</h2>
              <p className="mb-8 max-w-sm mx-auto opacity-70" style={{ color: design.textColor }}>
                We've sent a confirmation email to {guestDetails.email}. We look forward to seeing you.
              </p>
              
              <div 
                className="inline-block p-6 text-left min-w-[280px]"
                style={{ 
                    background: 'rgba(255,255,255,0.05)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: `${design.cornerRadius}px`
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Calendar style={{ color: design.primaryColor }} size={20} />
                  <span className="font-medium" style={{ color: design.textColor }}>{date}</span>
                </div>
                 <div className="flex items-center gap-3 mb-3">
                  <Clock style={{ color: design.primaryColor }} size={20} />
                  <span className="font-medium" style={{ color: design.textColor }}>{time}</span>
                </div>
                 <div className="flex items-center gap-3">
                  <Users style={{ color: design.primaryColor }} size={20} />
                  <span className="font-medium" style={{ color: design.textColor }}>{partySize} Guests</span>
                </div>
              </div>
              
              <button 
                onClick={() => window.location.reload()} 
                className="block mx-auto mt-8 text-sm hover:underline"
                style={{ color: design.primaryColor }}
              >
                Make another reservation
              </button>
            </div>
          )}
        </div>
        
        <div className="mt-8 text-center">
            <p className="text-xs opacity-40" style={{ color: design.textColor }}>Powered by Lumiere</p>
        </div>
      </div>
    </div>
  );
};