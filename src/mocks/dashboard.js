export const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  avatar: require('@/assets/default-avatar.png'),
  interests: ['Technology', 'Outdoor Activities']
}

export const mockUserCommunities = [
  {
    id: 1,
    name: 'Tech Enthusiasts',
    description: 'For all technology lovers',
    avatar: require('@/assets/community-tech.jpg'),
    members: 245,
    isMember: true
  },
  {
    id: 2,
    name: 'Outdoor Adventures',
    description: 'Hiking, camping and more',
    avatar: require('@/assets/community-outdoor.jpg'),
    members: 189,
    isMember: true
  }
]

export const mockRecommendedCommunities = [
  {
    id: 3,
    name: 'Book Club',
    description: 'Monthly book discussions',
    avatar: require('@/assets/community-books.jpg'),
    members: 87,
    isMember: false
  },
  {
    id: 4,
    name: 'Local Foodies',
    description: 'Discovering local restaurants',
    avatar: require('@/assets/community-food.jpg'),
    members: 112,
    isMember: false
  }
]

export const mockUpcomingEvents = [
  {
    id: 1,
    title: 'Tech Meetup',
    date: new Date(Date.now() + 86400000).toISOString(),
    location: 'Virtual',
    community: {
      id: 1,
      name: 'Tech Enthusiasts',
      avatar: require('@/assets/community-tech.jpg')
    }
  },
  {
    id: 2,
    title: 'Weekend Hike',
    date: new Date(Date.now() + 172800000).toISOString(),
    location: 'Central Park',
    community: {
      id: 2,
      name: 'Outdoor Adventures',
      avatar: require('@/assets/community-outdoor.jpg')
    }
  }
]