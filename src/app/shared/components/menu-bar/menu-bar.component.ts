import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {
  customerId!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.customerId = params['id'];
      console.log(this.customerId, "customerId");
      console.log(params);
    });
  }

  navigate(path: string): void {
    this.router.navigate([`/customer/${this.customerId}/${path}`]);
  }

  isActive(url: string): boolean {
    return this.router.url === url;
  }
}