/* eslint-disable class-methods-use-this */
import Data from './Data';

const twoDigit = number => (number < 10 ? `0${number}` : number);

const buildDataUrl = (dataId, year = null, month = null, date = null) => {
    if (!year || !month || !date) return `./src/Data/graph_data2/contest/${dataId}/overview.json`;
    return `./src/Data/graph_data2/contest/${dataId}/${year}-${twoDigit(month)}/${twoDigit(date)}.json`;
};

const buildDataUrlFromDailyTimestamp = (dataId, timestamp) => {
    const date = new Date(timestamp);
    return buildDataUrl(dataId, date.getFullYear(), date.getMonth() + 1, date.getDate());
};

// const getJson = (url, onLoaded) => {
//     const request = new XMLHttpRequest();
//     request.onreadystatechange = () => {
//         if (request.readyState === 4 && request.status === 200) {
//             // TODO - preloaders ????????
//             // document.body.removeChild(document.getElementById('preloader'));

//             const data = JSON.parse(request.responseText);
//             onLoaded(data);
//         }
//     };
//     request.open('GET', url, true);
//     request.send(null);
// };

// Loads data and maps it to instances of Dataset classes.
export default class DataProvider {
    loadOverviewData(dataId) {
        const url = buildDataUrl(dataId);

        return fetch(url)
            .then((response) => {
                if (response.status === 200) return response.json();
                throw Error('fetch failed');
            })
            .then((json) => {
                console.log(json);
                return new Data(json);
            })
            .catch((error) => {
                console.log(error); // TODO - error handler
            });
    }

    loadDetailedData(dataId, timestamp) {
        const url = buildDataUrlFromDailyTimestamp(dataId, timestamp);

        return fetch(url)
            .then((response) => {
                if (response.status === 200) return response.json();
                throw Error('fetch failed');
            })
            .then(json => new Data(json))
            .catch((error) => {
                console.log(error); // TODO - error handler
            });
    }
}
