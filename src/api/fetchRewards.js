const fetchRewards = async (requestType = 'GET', postBody) => {
  const url = 'https://frontend-take-home.fetchrewards.com/form';

  try {
    if (requestType === 'GET') {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } else if (requestType === 'POST' && postBody) {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postBody),
      });
      const data = await res.json();
      return data;
    } else {
      throw new Error(
        'API only accepts GET AND POST requests. POST requires body.'
      );
    }
  } catch (e) {
    console.error('Fetch rewards request failed', e);
  }
};

export default fetchRewards;
