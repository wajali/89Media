import { Injectable } from '@angular/core';
import { Hits } from './hits';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HitsService {
  private hitsURL ='/api/hits';

  constructor(private http: Http) { }

  // get("/api/contacts")
  getContacts(): Promise<void | Hits[]> {
    return this.http.get(this.hitsURL)
               .toPromise()
               .then(response => response.json() as Hits[])
               .catch(this.handleError);
  }

  // post("/api/contacts")
  createContact(newContact: Hits): Promise<void | Hits> {
    return this.http.post(this.hitsURL, newContact)
               .toPromise()
               .then(response => response.json() as Hits)
               .catch(this.handleError);
  }

  // get("/api/contacts/:id") endpoint not used by Angular app

  // delete("/api/contacts/:id")
  deleteContact(delContactId: String): Promise<void | String> {
    return this.http.delete(this.hitsURL + '/' + delContactId)
               .toPromise()
               .then(response => response.json() as String)
               .catch(this.handleError);
  }

  // put("/api/contacts/:id")
  updateContact(putContact: Hits): Promise<void | Hits> {
    var putUrl = this.hitsURL + '/' + putContact._id;
    return this.http.put(putUrl, putContact)
               .toPromise()
               .then(response => response.json() as Hits)
               .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
