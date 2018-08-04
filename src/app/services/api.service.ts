import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private _httpUrl = 'http://localhost:8000';
    private _date: Date = new Date();

    constructor(
        private _http: HttpClient
    ) {
    }

    getTodaysJammer() {
        return this._http.get(this._httpUrl + '/todaysjammer');
    }

    getJammerById($id: number) {
        return this._http.get(this._httpUrl + '/jammer/' + $id);
    }

    /**
     * Get a random jammer from the available pool
     *
     * @param {number} $excludeId
     * @returns {Observable<Object>}
     */
    getRandomJammer($excludeId: number = null) {
        let uri = '/randomjammer';
        if ($excludeId) {
            uri += '/' + $excludeId;
        }
        return this._http.get(this._httpUrl + uri);
    }

    putNewJammer($name: string) {
        // return this.http.post(this._httpUrl + '/jammer/');
    }

    updateJammerStatus($status: number) {

    }

    deleteJammerById($id: number) {

    }

    getHistoricJam(date = null) {
        if (!date) {
            date = this._formatDate(this._date);
        }
        return this._http.get(this._httpUrl + '/historicJam/' + date);
    }

    putNewJam($id: number, $youtube: string) {
        return this._http.put(
            this._httpUrl + '/jam/' + $id + '/' + $youtube,
            null
        );
    }

    private _formatDate($date) {
        $date.setDate($date.getDate() + 0);

        return $date.getFullYear() + '-'
            + ('0' + ($date.getMonth() + 1)).slice(-2) + '-'
            + ('0' + $date.getDate()).slice(-2);
    }
}
