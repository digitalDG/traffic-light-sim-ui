import { Component, OnInit } from '@angular/core';
import { SseService } from "src/app/services/sse/sse.service";

@Component({
  selector: 'app-traffic-light',
  templateUrl: './traffic-light.component.html',
  styleUrls: ['./traffic-light.component.scss']
})
export class TrafficLightComponent implements OnInit {
  public lights = {
    red: false,
    yellow: false,
    green: false
  };

  constructor(private sseService: SseService) { }

  ngOnInit(): void {
    this.sseService
      .getServerSentEvent('http://localhost:8081/sse/light-status')
      .subscribe(event => {
        console.log(event);
        let msgData = event.data;
        let obj = JSON.parse(msgData);

        if (obj.currentState === 'RED') {
          this.lights.red = true;
          this.lights.yellow = false;
          this.lights.green = false;
        } else if (obj.currentState === 'YELLOW') {
          this.lights.yellow = true;
          this.lights.red = false;
          this.lights.green = false;
        } else if (obj.currentState === 'GREEN') {
          this.lights.green = true;
          this.lights.red = false;
          this.lights.yellow = false;
        }
      });
  }

}
