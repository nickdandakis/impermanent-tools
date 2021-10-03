module.exports = {
  images: {
    domains: [
      'mint.impermanent.digital',
      'via.placeholder.com',
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'query',
            key: 'id',
          },
        ],
        permanent: true,
        destination: '/compare',
      },
    ];
  }
}
