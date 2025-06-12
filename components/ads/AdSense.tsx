import { useEffect, useRef } from 'react';

interface AdSenseProps {
  slot: string;
  format?: string;
  responsive?: boolean;
  style?: React.CSSProperties;
}

const AdSense: React.FC<AdSenseProps> = ({
  slot,
  format = 'auto',
  responsive = true,
  style = {},
}) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if window is defined (browser environment)
    if (typeof window === 'undefined') return;
    
    // Check if AdSense script is loaded
    if (window.adsbygoogle) {
      try {
        // Push the ad to AdSense
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, []);

  // Define ad styles based on slot
  const getAdStyles = () => {
    switch (slot) {
      case 'top-ad':
        return { minHeight: '90px', marginBottom: '2rem' };
      case 'middle-ad':
        return { minHeight: '250px', margin: '2rem 0' };
      case 'bottom-ad':
        return { minHeight: '90px', marginTop: '2rem' };
      case 'sidebar-ad':
        return { minHeight: '600px', width: '100%' };
      default:
        return { minHeight: '100px' };
    }
  };

  return (
    <div className="ad-container" style={{ ...getAdStyles(), ...style }}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your AdSense publisher ID
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
        ref={adRef}
      />
    </div>
  );
};

// Add window.adsbygoogle type definition
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default AdSense;