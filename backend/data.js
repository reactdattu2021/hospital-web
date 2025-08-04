const initialDoctors = [
  {
    id: 'doc1',
    name: 'Dr. Jane Smith',
    specialization: 'Cardiology',
    profileImage: 'https://images.unsplash.com/photo-1559839734-2b716b1fda4b?q=80&w=1950&auto=format&fit=crop',
    bio: 'Dr. Smith is a board-certified cardiologist with over 15 years of experience...',
    availability: [
      { date: '2025-08-01', slots: ['09:00', '10:00', '11:00'] },
      { date: '2025-08-02', slots: ['14:00', '15:00', '16:00'] },
    ],
  },
  {
    id: 'doc2',
    name: 'Dr. Alex Chen',
    specialization: 'Dermatology',
    profileImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop',
    bio: 'Dr. Chen specializes in medical and cosmetic dermatology. He is passionate about skin health...',
    availability: [
      { date: '2025-08-01', slots: ['13:00', '14:00'] },
      { date: '2025-08-03', slots: ['09:30', '10:30', '11:30'] },
    ],
  },
  {
    id: 'doc3',
    name: 'Dr. Emily White',
    specialization: 'Pediatrics',
    profileImage: 'https://images.unsplash.com/photo-1582759902640-155ac1022378?q=80&w=2000&auto=format&fit=crop',
    bio: 'Dr. White provides compassionate care for children and adolescents...',
    availability: [
      { date: '2025-08-04', slots: ['08:00', '09:00', '10:00'] },
      { date: '2025-08-05', slots: ['13:00', '14:00'] },
    ],
  },
];

module.exports = initialDoctors;