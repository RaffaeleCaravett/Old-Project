import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiziService } from 'src/app/Servizi/servizi.service';
import { EChartsOption } from 'echarts';





@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit,AfterViewInit{
  displayedColumns: string[] = ['Immagine del Profilo', 'Nome', 'Cognome', 'Data di nascita',
  'Luogo di nascita', 'Interessi', 'Professione', 'Sesso','Stato'];
  dataSource!:MatTableDataSource<any>
  data:any=[]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  iterazioni: any=[];
  commenti: any=[];
  commentiAiPost: any=[];
  option!:EChartsOption
  relazioni:any=[]
  @Input()user:any
  nowOnline:any=[]
  option1!:EChartsOption
  iterazioniPersonali: any=[];
  commentiPersonali: any=[];
  commentiPersonaliAiPost: any=[];
  relazioniPersonali: any=[];
  totalVisitors: any=[];
  option2!: EChartsOption
  male: any=[];
  female: any=[];
  trans: any=[];
  @Input() color:string
  @Input() text:string


  constructor(private servizi:ServiziService,private spinner:NgxSpinnerService) {
this.servizi.getUsers().subscribe((data:any)=>{
  this.nowOnline=[]
  Object.keys(data).map(key=>{
    this.data.push(data[key])
    this.dataSource=new MatTableDataSource(this.data)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
    if(data[key].isOnline==true){
      this.nowOnline.push(data[key])
    }
    if(data[key].sesso=='M'){
      this.male.push(data[key])
    }
    if(data[key].sesso=='F'){
      this.female.push(data[key])
    }
    if(data[key].sesso=='T'){
      this.trans.push(data[key])
    }
  })
console.log(this.male,this.female,this.trans)
})
this.servizi.getIterazioni().subscribe((data:any)=>{
Object.keys(data).map(key=>{
  this.iterazioni.push(data[key])
  if(data[key].utenteCheMetteLike==this.user.id){
    this.iterazioniPersonali.push(data[key])
  }
})
})
this.servizi.prendiCommento().subscribe((data:any)=>{
  Object.keys(data).map(key=>{
    this.commenti.push(data[key])
    if(data[key].id==this.user.id||data[key].idDiChiCondivide==this.user.id){
      this.commentiPersonali.push(data[key])
    }
  })
})
this.servizi.prendiCommentoalPost().subscribe((data:any)=>{
  Object.keys(data).map(key=>{
    this.commentiAiPost.push(data[key])
    if(data[key].id==this.user.id){
      this.commentiPersonaliAiPost.push(data[key])
    }
  })
  this.servizi.getRelazione().subscribe((data:any)=>{
    Object.keys(data).map(key=>{
      this.relazioni.push(data[key])
      if(data[key].idCheSegue==this.user.id){
        this.relazioniPersonali.push(data[key])
      }
    })
  })
this.servizi.getVisitatori().subscribe((data:any)=>{
  Object.keys(data).map(key=>{
    this.totalVisitors.push(data[key])
  })
})
})

  }
  ngAfterViewInit(): void {

  }
  ngOnInit(): void {
    setTimeout(()=>{
 this.option = {
      title: {
        text: 'Statistiche'
      },
      tooltip: {
        trigger: 'axis'
      },
animation: true,
animationDuration: 3500,
animationDurationUpdate: 3500,
animationEasing: 'cubicInOut',
animationEasingUpdate: 'cubicInOut',
animationThreshold: 2000,
progressiveThreshold: 3000,
progressive: 1000,
hoverLayerThreshold: 3000,
useUTC: false,
      legend: {
        data: ['Utenti', 'Interazioni', 'Posts', 'Commenti','Relazioni']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Utenti',
          type: 'line',
          stack: 'Total',
          data: [0, this.data.length/5, this.data.length/4, this.data.length/3, this.data.length/2, this.data.length]
        },
        {
          name: 'Interazioni',
          type: 'line',
          stack: 'Total',
          data: [ 0, this.iterazioni.length/5, this.iterazioni.length/4, this.iterazioni.length/3, this.iterazioni.length/2, this.iterazioni.length]
        },
        {
          name: 'Posts',
          type: 'line',
          stack: 'Total',
          data: [0, this.commenti.length/5, this.commenti.length/4, this.commenti.length/3, this.commenti.length/2, this.commenti.length]
        },
        {
          name: 'Commenti',
          type: 'line',
          stack: 'Total',
          data: [0, this.commentiAiPost.length/5, this.commentiAiPost.length/4, this.commentiAiPost.length/3, this.commentiAiPost.length/2, this.commentiAiPost.length]
        },
        {
          name: 'Relazioni',
          type: 'line',
          stack: 'Total',
          data: [0, this.relazioni.length/5, this.relazioni.length/4, this.relazioni.length/3, this.relazioni.length/2, this.relazioni.length]
        }
      ]
    };
    const posList = [
      'left',
      'right',
      'top',
      'bottom',
      'inside',
      'insideTop',
      'insideLeft',
      'insideRight',
      'insideBottom',
      'insideTopLeft',
      'insideTopRight',
      'insideBottomLeft',
      'insideBottomRight'
    ] as const;
    var app: any = {};
type EChartsOption = echarts.EChartsOption;
    app.configParameters = {
      rotate: {
        min: -90,
        max: 90
      },
      align: {
        options: {
          left: 'left',
          center: 'center',
          right: 'right'
        }
      },
      verticalAlign: {
        options: {
          top: 'top',
          middle: 'middle',
          bottom: 'bottom'
        }
      },
      position: {
        options: posList.reduce(function (map, pos) {
          map[pos] = pos;
          return map;
        }, {} as Record<string, string>)
      },
      distance: {
        min: 0,
        max: 100
      }
    };

    app.config = {
      rotate: 90,
      align: 'left',
      verticalAlign: 'middle',
      position: 'insideBottom',
      distance: 15,
      onChange: function () {
        const labelOption: BarLabelOption = {
          rotate: app.config.rotate as BarLabelOption['rotate'],
          align: app.config.align as BarLabelOption['align'],
          verticalAlign: app.config
            .verticalAlign as BarLabelOption['verticalAlign'],
          position: app.config.position as BarLabelOption['position'],
          distance: app.config.distance as BarLabelOption['distance']
        };

      }
    };

    type BarLabelOption = NonNullable<echarts.BarSeriesOption['label']>;

    const labelOption: BarLabelOption = {
      show: true,
      position: app.config.position as BarLabelOption['position'],
      distance: app.config.distance as BarLabelOption['distance'],
      align: app.config.align as BarLabelOption['align'],
      verticalAlign: app.config.verticalAlign as BarLabelOption['verticalAlign'],
      rotate: app.config.rotate as BarLabelOption['rotate'],
      formatter: '{c}  {name|{a}}',
      fontSize: 16,
      rich: {
        name: {}
      }
    };

    this.option1 = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['Interazioni', 'Posts', 'Commenti', 'Relazioni']
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'stack'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Interazioni',
          type: 'bar',
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: [ this.iterazioniPersonali.length/6, this.iterazioniPersonali.length/5, this.iterazioniPersonali.length/4, this.iterazioniPersonali.length/3, this.iterazioniPersonali.length/2, this.iterazioniPersonali.length]
        },
        {
          name: 'Posts',
          type: 'bar',
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: [this.commentiPersonali.length/6, this.commentiPersonali.length/5, this.commentiPersonali.length/4, this.commentiPersonali.length/3, this.commentiPersonali.length/2, this.commentiPersonali.length]
        },
        {
          name: 'Commenti',
          type: 'bar',
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: [this.commentiPersonaliAiPost.length/6, this.commentiPersonaliAiPost.length/5, this.commentiPersonaliAiPost.length/4, this.commentiPersonaliAiPost.length/3, this.commentiPersonaliAiPost.length/2, this.commentiPersonaliAiPost.length]
        },
        {
          name: 'Relazioni',
          type: 'bar',
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: [this.relazioniPersonali.length/6, this.relazioniPersonali.length/5, this.relazioniPersonali.length/4, this.relazioniPersonali.length/3, this.relazioniPersonali.length/2, this.relazioniPersonali.length]
        }
      ]
    };
    this.option2 = {
      title: {
        text: 'Gender Statistics',
        subtext: 'Real Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        bottom: 10,
        left: 'center',
        data: ['M', 'F', 'T']
      },
      series: [
        {
          type: 'pie',
          radius: '65%',
          center: ['50%', '50%'],
          selectedMode: 'single',
          data: [
            { value: this.male.length, name: 'M' },
            { value: this.female.length, name: 'F' },
            { value: this.trans.length, name: 'T' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    this.spinner.hide()
    },2500)
}


applyFilter(filterValue: string) {
  if(filterValue){
     this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  }

}
