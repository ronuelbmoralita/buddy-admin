const sendSingleDeviceNotification = data => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Authorization',
    'key=AAAAz2JMGJg:APA91bGhcNJLyXc3r6E8gNry2kpGta2bLFCAVsvssPRbRZc6idXjvE7W56x5O_qncXEYgR2E1Ir6Xx92GbYtabDjbg2VRr-YXudtJmLZ-d4qXLiE-KeCKwDa7DN35QagcRrd_lpVRpCF',
  );

  var raw = JSON.stringify({
    data: {
      rider_id: data.rider_id,
      passenger_id: data.passenger_id,
      mode: data.mode,
      image: data.image,
      latitude: data.latitude,
      longitude: data.longitude,
    },
    notification: {
      body: data.body,
      title: data.title,
    },
    to: data.token,
    coordinate: {
      a: data.a,
      b: data.b,
    },
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch('https://fcm.googleapis.com/fcm/send', requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};

const sendMultiDeviceNotification = data => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Authorization',
    'key=AAAAz2JMGJg:APA91bGhcNJLyXc3r6E8gNry2kpGta2bLFCAVsvssPRbRZc6idXjvE7W56x5O_qncXEYgR2E1Ir6Xx92GbYtabDjbg2VRr-YXudtJmLZ-d4qXLiE-KeCKwDa7DN35QagcRrd_lpVRpCF',
  );

  var raw = JSON.stringify({
    data: {},
    notification: {
      body: data.body,
      title: data.title,
    },
    registration_ids: data.token,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch('https://fcm.googleapis.com/fcm/send', requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};

export default {
  sendSingleDeviceNotification,
  sendMultiDeviceNotification,
};