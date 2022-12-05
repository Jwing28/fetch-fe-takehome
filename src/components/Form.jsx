import { useEffect, useState } from 'react';
import fetchRewards from '../api/fetchRewards';
import Success from './Success/Success';

import './Form.css';

const Form = () => {
  const [userData, setUserData] = useState({});
  const [rewardsData, setRewardsData] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const request = async () => {
      try {
        const result = await fetchRewards('POST', userData);
        if (result) {
          setHasSubmitted(true);
        } else {
          throw new Error('Unable to submit form data');
        }
      } catch (e) {
        console.error(e);
      }
    };

    request();
  };

  useEffect(() => {
    const request = async () => {
      const data = await fetchRewards('GET');
      setRewardsData(data);
    };

    request();
  }, []);

  return (
    <form className='form' onSubmit={handleSubmit}>
      <label>Full Name</label>
      <input
        onChange={handleInputChange}
        name='name'
        value={userData.name}
        required
      />
      <label>Email</label>
      <input
        type='email'
        onChange={handleInputChange}
        name='email'
        value={userData.email}
        required
      />
      <label>Password</label>
      <input
        type='password'
        onChange={handleInputChange}
        name='password'
        value={userData.password}
        required
      />
      <label>Occupation</label>
      <select
        name='occupation'
        onChange={handleInputChange}
        value={userData.occupation || ''}
        required
      >
        <option selected='selected' value='' disabled>
          Choose an occupation
        </option>
        {Object.keys(rewardsData).length
          ? rewardsData?.occupations.map((occupation, idx) => (
              <option key={`occupation ${idx}`} value={occupation}>
                {occupation}
              </option>
            ))
          : null}
      </select>

      <label>State</label>
      <select
        name='state'
        onChange={handleInputChange}
        value={userData.state || ''}
        required
      >
        <option selected='selected' value='' disabled>
          Choose a state
        </option>
        {Object.keys(rewardsData).length
          ? rewardsData?.states.map((state, idx) => (
              <option key={`state ${idx}`} value={state.abbreviation}>
                {state.name}
              </option>
            ))
          : null}
      </select>

      <button type='submit'>Submit</button>
      {hasSubmitted ? <Success /> : null}
    </form>
  );
};

export default Form;
