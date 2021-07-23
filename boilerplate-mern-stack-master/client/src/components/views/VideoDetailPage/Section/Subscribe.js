import React from 'react';
import Axios from 'axios';

function Subscribe(props) {
  const [subscribeNumber, setSubscribeNumber] = userState();
  const [subscribed, setSubscribed] = useState(initialState);

  useEffect(() => {
    let variable = { userTo: props.userTo };

    Axios.get('/api/subscribe/subscribeNumber', variable).then((res) => {
      if (res.data.success) {
        setSubscribeNumber(res.data.subscribeNumber);
      } else {
        alert('구독자 수 정보를 받아오지 못했습니다.');
      }
    });
    let subscirbeVariable = {
      userTo: props.userTo,
      userForm: localStorage.getItem('userId'),
    };

    Axios.post('/api/subscirbe/subscribed', subscirbeVariable).then((res) => {
      if (res.data.success) {
        setSubscribed(res.data.subscribed);
      } else {
        alert('정보 못받아왔는뎅');
      }
    });
  }, []);

  const unSubscribe = () => {
    let subscribe = {
      userTo: porps.userTo,
      userForm: props.userForm,
    };

    if (subscribe) {
      Axios.post('/api/subscribe/unsubscribe', subscribe).then(res => {
        if(res.data.success){
          setSubscribeNumber(subscribeNumber--)
          setSubscribed(!subscribed)
        }else{
          alert('구독 취소쓰~')
        }
      })
    } else {
      Axios.post('/api/subscribe/subscribe', subscribe).then(res => {
        if(res.data.success){
          setSubscribeNumber(subscribeNumber++)
          setSubscribed(!subscribed)
        }else{
          alert('구독 취소쓰~')
        }
    }
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: `${subscribed ? '#cc0000' : '#AAAAAA'}`,
          borderRadius: '4px',
          color: 'white',
          padding: '10px 16px',
          fontWeight: '500',
          fontSize: '1rem',
          textTransform: 'uppercase',
        }}
        onClick={unSubscribe}
      >
        {subscribeNumber} {subscribed ? 'Subscribed' : 'Subscribe'}
      </button>
    </div>
  );
}

export default Subscribe;
