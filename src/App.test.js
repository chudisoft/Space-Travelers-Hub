import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import configureStore from 'redux-mock-store';
// eslint-disable-next-line import/no-extraneous-dependencies
import thunk from 'redux-thunk';
import { setMissions } from './redux/mission/missionsSlice'; // Import your action creators
import App from './App';

const mockStore = configureStore([thunk]);

describe('Test missions component', () => {
  const mockMissionsData = [
    {
      mission_name: 'Thaicom',
      mission_id: '9D1B7E0',
      manufacturers: ['Orbital ATK'],
      payload_ids: ['Thaicom 6', 'Thaicom 8'],
      wikipedia: 'https://en.wikipedia.org/wiki/Thaicom',
      website: 'http://www.thaicom.net/en/satellites/overview',
      twitter: 'https://twitter.com/thaicomplc',
      description: 'Thaicom is the name of a series of communications satellites operated from Thailand, and also the name of Thaicom Public Company Limited, which is the company that owns and operates the Thaicom satellite fleet and other telecommunication businesses in Thailand and throughout the Asia-Pacific region. The satellite projects were named Thaicom by the King of Thailand, His Majesty the King Bhumibol Adulyadej, as a symbol of the linkage between Thailand and modern communications technology.',
      reserved: false,
    },
  ];

  // Mock store with initial missions state and action creators
  const store = mockStore({
    missions: {
      missions: mockMissionsData,
      error: null,
    },
  });
  // Dispatch setMissions action with mock data
  store.dispatch(setMissions(mockMissionsData));

  test('renders missions after fetching data', async () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    await waitFor(() => {
      const missionTitles = getAllByText(/Thaicom is the name/);
      expect(missionTitles.length).toBe(2);
    });
  });
});
