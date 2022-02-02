var version = '2.7';
var dbName = 'pwa-db';

self.addEventListener('sync', (event) => {
  if (event.tag === 'event-data' || event.tag === 'profile-data') {
    event.waitUntil(syncPosts());
  }
  clearDbPosts();
});


function syncPosts(){
  let db;
  const request = indexedDB.open(dbName+version);
  request.onerror = (event) => {
    console.log('Please allow my web app to use IndexedDB');
  };
  request.onsuccess = (event) => {
    db = event.target.result;
    syncData(db);
  };
}



function syncData(db){
  const transactionEvent = db.transaction(['EventPost'],"readwrite");
  const objectStoreEvent = transactionEvent.objectStore('EventPost');

  const transactionProfile = db.transaction(['ProfilePost'],"readwrite");
  const objectStoreProfile = transactionProfile.objectStore('ProfilePost');

  var eventRequests = objectStoreEvent.getAll();
  var profileRequests = objectStoreProfile.getAll();
  fetchAllRequests(eventRequests, profileRequests);
}


function fetchAllRequests(eventRequests,profileRequests){
  eventRequests.onsuccess = () => {
    eventRequests.result.forEach( (element,index) => {
      var data = element.model;
      var token = element.token;

      fetch(element.path, {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })
      .then(response => {
        console.log(response);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    });
  };

  profileRequests.onsuccess = () => {
    profileRequests.result.forEach( (element,index) => {
      var data = element.model;
      var token = element.token;

      fetch(element.path, {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })
      .then(response => {
        console.log(response);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    });
  };
}

function clearDbPosts(){
  let db;
  const request = indexedDB.open(dbName+version);
  request.onsuccess = (event) => {
    db = event.target.result;

    const transactionEvent = db.transaction(['EventPost'],"readwrite");
    const objectStoreEvent = transactionEvent.objectStore('EventPost');

    const transactionProfile = db.transaction(['ProfilePost'],"readwrite");
    const objectStoreProfile = transactionProfile.objectStore('ProfilePost');

    objectStoreEvent.clear();
    objectStoreProfile.clear();
  };
}
