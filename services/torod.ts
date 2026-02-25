
export const trackShipment = async (trackingNumber: string) => {
  // Simulate API call to torod.co
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Predictable simulation based on tracking number suffix
  // In a real app, this would hit https://torod.co/api/v1/track
  const lastChar = trackingNumber.charAt(trackingNumber.length - 1);
  const hour = new Date().getHours();
  
  let status: 'pending' | 'shipped' | 'delivered' | 'cancelled' = 'shipped';
  
  // Simulate status progression
  if (parseInt(lastChar) % 2 === 0) {
    status = 'delivered';
  } else if (hour > 20) {
    status = 'delivered';
  } else {
    status = 'shipped';
  }
  
  return {
    success: true,
    trackingNumber,
    status,
    carrier: 'Torod Express',
    lastUpdate: new Date().toISOString(),
    events: [
      { time: new Date().toISOString(), location: 'Hub', description: `Status updated to ${status}` }
    ]
  };
};
