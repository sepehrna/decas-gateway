import W3bStreamClientConfig from "../entity/configuration/W3bStreamClientConfig.js";
import {W3bstreamClient} from "w3bstream-client-js";
import W3bStreamEvent from "../entity/w3bstream/W3bStreamEvent.js";
import {interval, Observable} from "rxjs";
import axios, {AxiosResponse} from 'axios';


let client: W3bstreamClient;
let clientConfig: W3bStreamClientConfig;

async function initW3bStreamClient(w3bStreamClientConfig: W3bStreamClientConfig): Promise<boolean> {
    if (!client) {
        if (!w3bStreamClientConfig.url || !w3bStreamClientConfig.apiKey) {
            throw new Error("W3bStreamClient config is not valid");
        }
        client = new W3bstreamClient(w3bStreamClientConfig.url, w3bStreamClientConfig.apiKey);
        clientConfig = w3bStreamClientConfig;
    }
    return !!client;
}

function getPromises<T>(events: W3bStreamEvent<T>[]) {
    return events.map(event => {
        const headers = {
            'Content-Type': 'application/octet-stream',
            'Authorization': 'Bearer ' + clientConfig.apiKey
        };
        let eventType = event.getEventType.toString();
        let currentTime = Date.now().toString();
        const requestOptions = {
            method: 'POST',
            headers: headers,
            data: event,
            url: clientConfig.url + '?eventType=' + eventType + '&timestamp=' + currentTime,
        };

        return axios(requestOptions);
    });
}

function sendBatch<T>(events: W3bStreamEvent<T>[]): Observable<AxiosResponse[]> {
    return new Observable<AxiosResponse[]>(subscriber => {
        const requests = getPromises(events);
        console.log(requests.length);
        Promise.all(requests)
            .then(responses => subscriber.next(responses))
            .catch(error => subscriber.error(error));
    });
}

function publishSingle<T>(event: W3bStreamEvent<T>): void {
    publish(event);
    const events: W3bStreamEvent<T>[] = [];
    events.push(event);
    const requests = getPromises(events);
    Promise.all(requests)
        .then(responses => console.log(responses))
        .catch(error => console.error(error));

}

function publishEvents<T>(allEvents: W3bStreamEvent<T>[], batchSize: number, intervalInMillis: number): void {
    if (allEvents.length > 1) {
        const observable = publishBatchEvents(allEvents, batchSize, intervalInMillis);
        observable.subscribe({
            next(responses) {
                console.log('Batch response length:', responses);
            },
            error(err) {
                console.error('Error occurred:', err);
            },
            complete() {
                console.log('All event batches have been published');
            }
        });
    } else {
        publishSingle(allEvents[0]);
    }
}

function publish<T>(event: W3bStreamEvent<T>): void {
    let individualName = "057a35eb-8b62-41c8-9806-44f071cfad03";
    // @ts-ignore
    let temperature = event.getPayload.temperatureCentigrade;
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",temperature);
    axios.post("http://localhost:8080/infer-temperature?temperature=" + temperature + "&individualName=" + individualName)
        .then(response => response.data)
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

function publishBatchEvents<T>(allEvents: W3bStreamEvent<T>[], batchSize: number, intervalInMillis: number): Observable<AxiosResponse[]> {
    return new Observable<AxiosResponse[]>(subscriber => {
        let index = 0;
        console.log(index);
        const subscription = interval(intervalInMillis).subscribe(() => {
            const batch = allEvents.slice(index, index + batchSize);

            if (batch.length === 0) {
                subscriber.complete();
                subscription.unsubscribe();
            } else {
                sendBatch(batch).subscribe({
                    next: (responses) => subscriber.next(responses),
                    error: (error) => subscriber.error(error)
                });
                index += batchSize;
            }
        });

        return () => subscription.unsubscribe();
    });
}


export {initW3bStreamClient, publishEvents};