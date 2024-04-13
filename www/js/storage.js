/*
*
* (C) obook 2020-2024
*
*/


export { StorageAvailable, StorageExists, StorageClear};

function StorageClear() {
  localStorage.clear();
}

function StorageExists(number) {
  let key = "Q"+ number;

  if (StorageAvailable("localStorage")) {
    try {
      if (localStorage.getItem(key))
        return(true);
    } catch (error) {
        console.log("StorageExists error trig !");
    }
  } else {
    // Malheureusement, localStorage n'est pas disponible
  }

return(false);
}

function StorageAvailable(type) {
  try {
    var storage = window[type],
      x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage.length !== 0
    );
  }
}
