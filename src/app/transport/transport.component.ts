import { Component,ViewChild,ElementRef,ChangeDetectorRef,HostListener, OnInit } from '@angular/core'

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent implements OnInit {
  @ViewChild('tranportWrapper') tranportWrapper!:ElementRef
  @ViewChild('airport') airport!:ElementRef
  @HostListener('window:resize', ['$event'])
  dots:boolean=false
  variable = 'M0,100  C150,100 50,0 200,0';
  colors=['#FFEFD5','#FFDAB9','#FFA07A','#FF8C00','#FF6347']
  transportArray = [
    { text: 'BLR-OOTY', level: 1 },
    { text: 'CHE-OOTY', level: 1 },
    { text: 'BLR-CHE', level: 1 },
    { text: 'OOTY-BLR', level: 0 },
    { text: 'BLR-OOTY', level: 0 },
    { text: 'CHE-OOTY', level: 1 },
  ];
  pathsArray:any = [];
  onResize() {
    this.pathsArray=this.getPaths()
  }
  constructor(private cdr:ChangeDetectorRef){}
  ngAfterViewInit() {
    setTimeout(()=>{
      this.pathsArray=this.getPaths()

    })
  }
  ngOnInit(): void {
      
  }
  redraw(){
    setTimeout(()=>{
      this.pathsArray=this.getPaths()

    })
  }
  getPaths()
  {
    const rect=this.tranportWrapper.nativeElement.getBoundingClientRect();
    let width=this.airport.nativeElement.getBoundingClientRect().width
    const space=(rect.width-width*this.transportArray.length)/(this.transportArray.length)
    width=width+space
    const routePaths:any = [];
    this.transportArray.forEach((value, i) => {
      if (i) {
        const fromY = this.transportArray[i - 1].level * 50+1;
        const fromX = i * width - space;
        const toY = value.level * 50+1;
        const toX = i *width;

        if (value.level == this.transportArray[i - 1].level) {
          routePaths.push(
            'M' + fromX + ',' + fromY + ' L' + (toX) + ',' + toY
          );
        } else {
          const middle=(fromX+toX)/2
          routePaths.push(
            'M' + fromX + ',' + fromY + ' C' + middle + ',' + fromY+' '+middle+','+toY+' '+toX+','+toY
          );
        }
      }
    });
    return routePaths;
  }
}
