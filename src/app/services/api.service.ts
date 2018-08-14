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

    getAllJammers($include_jams = false, $show_inactive = false) {

        let url = this._httpUrl + '/jammer';

        if ($show_inactive) {
            url = this._httpUrl + '/jammers';
        }
        return this._http.get(url);
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
        return this._http.put(this._httpUrl + '/jammer/' + $name, null);
    }

    updateJammerStatus($user_id: number, $status: number) {
        return this._http.post(this._httpUrl + '/jammer/' + $user_id + '/' + $status, null);
    }

    deleteJammerById($user_id: number) {
        return this._http.delete(this._httpUrl + '/jammer/' + $user_id);
    }

    getJams() {
        return this._http.get(this._httpUrl + '/jam');
    }

    getAllJams() {
        return this._http.get(this._httpUrl + '/jam');
    }

    getWildCardJam() {
        return this._http.get(this._httpUrl + '/wildJam');
    }

    getHistoricJam(date = null) {
        if (!date) {
            date = this._formatDate(this._date);
        }
        return this._http.get(this._httpUrl + '/historicJam/' + date);
    }

    getHighScoreJammer() {
        return this._http.get(this._httpUrl + '/highscore');
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
