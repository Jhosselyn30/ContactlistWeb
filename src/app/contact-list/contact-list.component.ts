import { Component, OnInit, inject } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { ChildActivationStart, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Contact } from '../model/contact.interface';

@Component({
    selector: 'app-contact-list',
    standalone: true,
    imports: [DatePipe, RouterModule],
    templateUrl: './contact-list.component.html',
    styleUrl: './contact-list.component.css'
})
export default class ContactListComponent  implements OnInit{
    private contactService = inject(ContactService);

    contacts: Contact[] = [];

    ngOnInit(): void {
        this.loadAll();
    }

    loadAll(){
        this.contactService.list()
        .subscribe(contacts =>{
            this.contacts =  contacts;
        });
    }

    deleteContact(contact: Contact){
        this.contactService.delete(contact.id)
            .subscribe(()=>{
                this.loadAll();
            })
    }
}
