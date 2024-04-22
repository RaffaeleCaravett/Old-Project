import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { finalize, tap, map } from 'rxjs/operators';
import { map as lodashMap } from 'lodash';
import { Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnChanges,OnInit {


  myControl = new FormControl('');
  paroleFrequenti: any=[]
  number:number=0
  @ViewChild('input') input:any
  @Input() value:any
  @Output() inputValue=new EventEmitter<any>()
   constructor(private changeDetectorRef:ChangeDetectorRef){

 }
  ngOnInit(): void {

  }

  ngOnChanges(changes:SimpleChanges){
 this.checkSimilarWords(this.value)
 this.changeDetectorRef.markForCheck()
 }

  checkSimilarWords(event:any){
    this.paroleFrequenti=[]
    if(event!=' '&&event!=''&&event.at(-2)!=' '){
      this.options.filter(string=>{
        if(string.includes(event.substring(this.number))){
          this.paroleFrequenti.push(string)
        }
      })
    }else if(event.at(-2)&&event.at(-2)==' '){
      let index=event.lastIndexOf(event.substring(event.length-1))
      this.number=index
      this.options.filter(string=>{
        if(string.includes(event.substring(this.number))){
          this.paroleFrequenti.push(string)
        }
      })
    }else if(event.at(-1)==' '){
      this.number=event.indexOf(event.length)
    }
    this.changeDetectorRef.markForCheck()
  }

updateInput(value:any){
this.inputValue.emit( value)
// this.input.nativeElement.value.substring(0, this.input.nativeElement.value.lastIndexOf(" ")+1||this.input.nativeElement.value.lastIndexOf(this.input.nativeElement.value.length)) + value
}
  options: string[] =[
'cosa',
'anno',
'uomo',
'giorno',
'volta',
'casa',
'parte',
'vita',
'tempo',
'donna',
'mano',
'occhio',
'ora',
'signore',
'paese',
'momento',
'modo',
'mondo',
'parola',
'padre',
'punto',
'lavoro',
'stato',
'caso',
'città',
'guerra',
'strada',
'figlio',
'notte',
'voce',
'nome',
'sera',
'acqua',
'amico',
'fatto',
'gente',
'amore',
'storia',
'aria',
'forza',
'testa',
'ragione',
'mare',
'mese',
'capo',
'luce',
'sole',
'famiglia',
'piede',
'persona',
'via',
'signora',
'governo',
'senso',
'opera',
'prodotto',
'festa',
'gioco',
'prova',
'campagna',
'fiore',
'sala',
'misura',
'posizione',
'natura',
'ufficio',
'specie',
'successo',
'zona',
'fuoco',
'soldato',
'vista',
'libertà',
'risultato',
'importanza',
'dubbio',
'ricerca',
'dio',
'figura',
'piazza',
'questione',
'nemico',
'pena',
'motivo',
'esperienza',
'ricordo',
'albero',
'politica',
'processo',
'vino',
'porta',
'sud',
'sogno',
'cane',
'isola',
'movimento',
'mente',
'occasione',
'prezzo',
'causa',
'periodo',
'sviluppo',
'sorella',
'effetto',
'giardino',
'attività',
'volontà',
'volto',
'base',
'carattere',
'coscienza',
'guardia',
'memoria',
'terreno',
'animale',
'direzione',
'eccellenza',
'malattia',
'scienza',
'funzione',
'conseguenza',
'parete',
'dente',
'distanza',
'gusto',
'impressione',
'istituto',
'quadro',
'attenzione',
'autore',
'difficoltà',
'passione',
'commissione',
'dito',
'inizio',
'programma',
'spettacolo',
'titolo',
'comunicazione',
'fenomeno',
'maggio',
'stampa',
'denaro',
'destino',
'dovere',
'ferro',
'punta',
'regno',
'epoca',
'luna',
'provincia',
'voglia',
'differenza',
'controllo',
'grazia',
'passato',
'spazio',
'stella',
'corsa',
'erba',
'massa',
'origine',
'polizia',
'soluzione',
'chilometro',
'madre',
'paura',
'cuore',
'idea',
'fondo',
'esempio',
'ordine',
'posto',
'campo',
'faccia',
'moglie',
'ragazzo',
'bisogno',
'cielo',
'letto',
'fronte',
'conto',
'corpo',
'numero',
'ministro',
'problema',
'chiesa',
'braccio',
'bambino',
'pensiero',
'pace',
'morte',
'fine',
'forma',
'resto',
'popolo',
'società',
'studio',
'legge',
'libro',
'figlia',
'resto',
'luogo',
'condizione',
'professore',
'marito',
'verità',
'segno',
'diritto',
'lettera',
'ragazza',
'scuola',
'camera',
'gruppo',
'lira',
'discorso',
'centro',
'secolo',
'mezzo',
'tipo',
'colpa',
'rispetto',
'scena',
'don',
 'oggetto',
 'possibilità',
 'mamma',
 'presenza',
 'teatro',
 'caffè',
 'principio',
 'termine',
 'lingua',
 'pezzo',
 'capello',
 'regione',
 'monte',
 'università',
 'treno',
 'inverno',
 'nazione',
 'pagina',
 'scopo',
 'compagno',
 'necessità',
 'potere',
 'musica',
 'dottore',
 'sentimento',
 'nave',
 'pietra',
 'produzione',
 'speranza',
 'dolore',
 'carne',
 'generale',
 'proposito',
 'elemento',
 'stazione',
 'materia',
 'scala',
 'maniera',
 'arma',
 'autorità',
 'gamba',
 'patria',
 'albergo',
 'gioia',
 'argomento',
 'sguardo',
 'relazione',
 'classe',
 'battaglia',
 'viso',
 'gesto',
 'mattino',
 'opinione',
 'ponte',
 'sorriso',
 'frase',
 'limite',
 'ritorno',
 'bosco',
 'esame',
 'lato',
 'operazione',
 'pranzo',
 'costa',
 'prato',
 'repubblica',
 'valle',
 'nord',
 'fatica',
 'odore',
 'articolo',
 'costruzione',
 'rivoluzione',
 'zia',
 'confronto',
 'potenza',
 'sforzo',
 'sicurezza',
 'ufficiale',
 'crisi',
 'cucina',
 'gatto',
 'pietà',
 'territorio',
 'attimo',
 'civiltà',
 'contatto',
 'errore',
 'fretta',
 'intenzione',
 'cultura',
 'giudizio',
 'spesa',
 'aiuto',
 'ambiente',
 'animo',
 'bestia',
 'cortile',
 'pelle',
 'proposta',
 'riva',
 'segretario',
 'abito',
 'chiave',
 'corrente',
 'operaio',
 'corso',
 'finestra',
 'arte',
 'sistema',
 'piano',
 'bocca',
    'anima',
    'palazzo',
    'passo',
    'giornata',
    'servizio',
    'rapporto',
    'milione',
    'stanza',
    'valore',
    'colpo',
    'sangue',
    'interesse',
    'spalla',
    'silenzio',
    'signorina',
    'ombra',
    'azione',
    'vento',
    'mattina',
    'colore',
    'presidente',
    'consiglio',
    'principe',
    'viaggio',
    'genere',
    'giornale',
    'spirito',
    'cavallo',
    'muro',
    'situazione',
    'linea',
    'giro',
    'automobile',
    'atto',
    'aspetto',
    'età',
    'fortuna',
    'oro',
    'partito',
    'macchina',
    'carta',
    'minuto',
    'tratto',
    'settimana',
    'notizia',
    'fratello',
    'realtà',
    'industria',
    'piacere',
    'maestro',
    'personaggio',
    'pomeriggio',
    'fianco',
    'bambina',
    'bellezza',
    'domanda',
    'pianta',
    'pubblico',
    'sede',
    'affare',
    'bene',
    'metà',
    'papà',
    'fiume',
    'lotta',
    'mercato',
    'angolo',
    'compagnia',
    'espressione',
    'labbro',
    'villa',
    'desiderio',
    'serie',
    'visita',
    'coraggio',
    'direttore',
    'esercito',
    'grado',
    'padrone',
    'risposta',
    'tavola',
    'immagine',
    'montagna',
    'energia',
    'fede',
    'pane',
    'seguito',
    'estate',
    'film',
    'frutto',
    'onore',
    'pericolo',
    'scrittore',
    'collina',
    'zio',
    'difesa',
    'metro',
    'collo',
    'cura',
    'disposizione',
    'Domenica',
    'giovanotto',
    'poeta',
    'stagione',
    'peso',
    'tono',
    'croce',
    'decisione',
    'poesia',
    'fiducia',
    'filo',
    'folla',
    'qualità',
    'roba',
    'conoscenza',
    'favore',
    'popolazione',
    'strumento',
    'uso',
    'vestito',
    'commercio',
    'fabbrica',
    'giugno',
    'giustizia',
    'avvocato',
    'messa',
    'orecchio',
    'sonno',
    'congresso',
    'porto',
    'calcio',
    'fantasia',
    'matrimonio',
    'medico',
    'ospedale',
    'pianura',
    'tavolo',
    'fame',
    'latte',
    'merito',
    'attore',
    'ricchezza',
    'sacrificio',
    'atteggiamento',
    'concetto',
    'mestiere',
    'attesa',
    'bagno',
    'foglia',
    'istante',
    'lago',
    'questo',
    'quello',
    'più',
    'tutto',
    'suo',
    'altro',
    'mio',
    'quale',
    'tanto',
    'grande',
    'poco',
    'molto',
    'nostro',
    'stesso',
    'primo',
    'loro',
    'ogni',
    'proprio',
    'solo',
    'quanto',
    'bello',
    'qualche',
    'nuovo',
    'certo',
    'vero',
    'buono',
    'tuo',
    'nessuno',
    'alcuno',
    'italiano',
    'ultimo',
    'vecchio',
    'piccolo',
    'troppo',
    'tale',
    'giovane',
    'alto',
    'vostro',
    'diverso',
    'meglio',
    'lungo',
    'povero',
    'maggiore',
    'mezzo',
    'secondo',
    'lontano',
    'vicino',
    'possibile',
    'caro',
    'pieno',
    'nero',
    'particolare',
    'bianco',
    'forte',
    'politico',
    'attuale',
    'latino',
    'impossibile',
    'sereno',
    'puro',
    'normale',
    'perfetto',
    'piano',
    'caratteristico',
    'russo',
    'continuo',
    'stupido',
    'estremo',
    'grigio',
    'reale',
    'interessante',
    'medesimo',
    'religioso',
    'ampio',
    'biondo',
    'ufficiale',
    'attento',
    'enorme',
    'sottile',
    'triste',
    'minimo',
    'privato',
    'rapido',
    'quarto',
    'diretto',
    'nobile',
    'parecchio',
    'pericoloso',
    'giallo',
    'pazzo',
    'sacro',
    'comodo',
    'elettrico',
    'assoluto',
    'cristiano',
    'antico',
    'rosso',
    'chiaro',
    'unico',
    'sicuro',
    'importante',
    'vario',
    'giusto',
    'francese',
    'vivo',
    'generale',
    'ricco',
    'grosso',
    'necessario',
    'libero',
    'nazionale',
    'basso',
    'semplice',
    'grave',
    'pubblico',
    'comune',
    'freddo',
    'economico',
    'felice',
    'difficile',
    'tedesco',
    'breve',
    'pronto',
    'serio',
    'presente',
    'migliore',
    'facile',
    'terzo',
    'caldo',
    'estero',
    'largo',
    'pricipale',
    'verde',
    'romano',
    'umano',
    'inutile',
    'moderno',
    'numeroso',
    'simile',
    'fresco',
    'militare',
    'americano',
    'vuoto',
    'ciascuno',
    'tranquillo',
    'contento',
    'storico',
    'superiore',
    'inglese',
    'fermo',
    'solito',
    'buio',
    'strano',
    'noto',
    'prossimo',
    'profondo',
    'sociale',
    'cattivo',
    'massimo',
    'intero',
    'uguale',
    'bravo',
    'brutto',
    'preciso',
    'qualsiasi',
    'improvviso',
    'famoso',
    'straniero',
    'civile',
    'internazionale',
    'interno',
    'vasto',
    'segreto',
    'greco',
    'naturale',
    'sinistro',
    'duro',
    'stanco',
    'azzurro',
    'recente',
    'notevole',
    'cittadino',
    'destro',
    'europeo',
    'zitto',
    'medio',
    'qualunque',
    'straordinario',
    'nudo',
    'futuro',
    'cattolico',
    'capace',
    'industriale',
    'personale',
    'centrale',
    'tecnico',
    'dolce',
    'leggero',
    'morale',
    'utile',
    'contrario',
    'speciale',
    'peggio',
    'minore',
    'contadino',
    'essere',
    'avere',
    'dire',
    'potere',
    'volere',
    'sapere',
    'stare',
    'dovere',
    'vedere',
    'andare',
    'venire',
    'dare',
    'parlare',
    'trovare',
    'sentire',
    'lasciare',
    'prendere',
    'guardare',
    'mettere',
    'pensare',
    'passare',
    'credere',
    'portare',
    'parere',
    'tornare',
    'sembrare',
    'tenere',
    'capire',
    'morire',
    'chiamare',
    'conoscere',
    'rimanere',
    'chiedere',
    'cercare',
    'entrare',
    'vivere',
    'aprire',
    'uscire',
    'ricordare',
    'bisognare',
    'cominciare',
    'rispondere',
    'aspettare',
    'riuscire',
    'chiudere',
    'finire',
    'arrivare',
    'scrivere',
    'diventare',
    'restare',
    'seguire',
    'bastare',
    'perdere',
    'rendere',
    'correre',
    'salvare',
    'vestire',
    'costruire',
    'camminare',
    'ritrovare',
    'durare',
    'accendere',
    'evitare',
    'immaginare',
    'ridurre',
    'contenere',
    'fissare',
    'costringere',
    'abbandonare',
    'attendere',
    'preferire',
    'scegliere',
    'avvertire',
    'proporre',
    'temere',
    'esprimere',
    'spingere',
    'salutare',
    'udire',
    'difendere',
    'dirigere',
    'cantare',
    'sorgere',
    'assicurare',
    'assumere',
    'tendere',
    'dividere',
    'scusare',
    'mantenere',
    'ritenere',
    'concludere',
    'saltare',
    'stabilire',
    'appartenere',
    'possedere',
    'risultare',
    'suonare',
    'coprire',
    'insegnare',
    'affermare',
    'rivelare',
    'conservare',
    'risolvere',
    'concedere',
    'limitare',
    'abitare',
    'convincere',
    'comprare',
    'legare',
    'sostenere',
    'nascere',
    'presentare',
    'trattare',
    'piacere',
    'continuare',
    'partire',
    'servire',
    'giungere',
    'fermare',
    'apparire',
    'amare',
    'esistere',
    'intendere',
    'salire',
    'mancare',
    'ridere',
    'lavorare',
    'alzare',
    'riconoscere',
    'sedere',
    'leggere',
    'cadere',
    'mangiare',
    'dormire',
    'raggiungere',
    'comprendere',
    'scendere',
    'compiere',
    'toccare',
    'considerare',
    'muovere',
    'stringere',
    'mandare',
    'domandare',
    'ascoltare',
    'decidere',
    'ricevere',
    'osservare',
    'permettere',
    'avvenire',
    'spiegare',
    'raccogliere',
    'ottenere',
    'offrire',
    'mostrare',
    'accompagnare',
    'dimenticare',
    'pregare',
    'raccontare',
    'bere',
    'ritornare',
    'cambiare',
    'dimostrare',
    'sperare',
    'sposare',
    'ammettere',
    'fuggire',
    'liberare',
    'riferire',
    'svegliare',
    'capitare',
    'posare',
    'impedire',
    'gettare',
    'vendere',
    'distinguere',
    'offendere',
    'rimettere',
    'rompere',
    'godere',
    'imporre',
    'significare',
    'desiderare',
    'divertire',
    'volgere',
    'giudicare',
    'produrre',
    'avvicinare',
    'diffondere',
    'ordinare',
    'invitare',
    'discutere',
    'sbagliare',
    'badare',
    'tagliare',
    'pubblicare',
    'attaccare',
    'imparare',
    'prevedere',
    'scappare',
    'spegnere',
    'annunciare',
    'baciare',
    'esporre',
    'attraversare',
    'fornire',
    'segnare',
    'superare',
    'rivedere',
    'allontanare',
    'ammazzare',
    'accogliere',
    'voltare',
    'preoccupare',
    'provocare',
    'riempire',
    'partecipare',
    'piantare',
    'rientrare',
    'richiedere',
    'nascondere',
    'ripetere',
    'scoprire',
    'preparare',
    'scorrere',
    'rappresentare',
    'riprendere',
    'costituire',
    'incontrare',
    'valere',
    'accorgersi',
    'provare',
    'formare',
    'uccidere',
    'tirare',
    'togliere',
    'notare',
    'aggiungere',
    'succedere',
    'pagare',
    'tentare',
    'accadere',
    'creare',
    'importare',
    'pesare',
    'usare',
    'accettare',
    'indicare',
    'buttare',
    'battere',
    'interessare',
    'sorridere',
    'condurre',
    'disporre',
    'unire',
    'aiutare',
    'piangere',
    'girare',
    'levare',
    'soffrire',
    'recare',
    'riguardare',
    'rivolgere',
    'tacere',
    'occorrere',
    'porre',
    'vincere',
    'svolgere',
    'studiare',
    'crescere',
    'divenire',
    'gridare',
    'dichiarare',
    'contare',
    'giocare',
    'assistere',
    'aumentare',
    'lanciare',
    'determinare',
    'scherzare',
    'elevare',
    'promettere',
    'scomparire',
    'trarre',
    'distruggere',
    'meritare',
    'dedicare',
    'iniziare',
    'sorprendere',
    'trasformare',
    'confessare',
    'arrestare',
    'ringraziare',
    'riunire',
    'volare',
    'fondare',
    'guidare',
    'ferire',
    'opporre',
    'procedere',
    'smettere',
    'consentire',
    'innamorare',
    'organizzare',
    'rifiutare',
    'riportare',
    'dipendere',
    'provvedere',
    'trascinare',
    'fumare',
    'scoppiare',
    'sognare',
    'appoggiare',
    'armare',
    'celebrare',
    'descrivere',
    'resistere',
    'bruciare',
    'colpire',
    'estendere',
    'staccare',
    'affrontare',
    'avanzare',
    'comporre',
    'escludere',
    'figurare',
    'insistere',
    'che',
    'non',
    'per',
    'con',
    'come',
    'anche',
    'perché',
    'lei',
    'ancora',
    'lui',
    'senza',
    'bene',
    'cui',
    'chi',
    'già',
    'dopo',
    'uno',
    'noi',
    'dove',
    'qui',
    'allora',
    'tra',
    'ora',
    'fra',
    'prima',
    'forse',
    'sotto',
    'voi',
    'fino',
    'oggi',
    'quasi',
    'pure',
    'egli',
    'mentre',
    'contro',
    'invece',
    'esso',
    'però',
    'subito',
    'verso',
    'ciò',
    'ecco',
    'loro',
    'essa',
    'fuori',
    'meno',
    'adesso',
    'niente',
    'cioè',
    'male',
    'nulla',
    'quindi',
    'appena',
    'insieme',
    'dunque',
    'dentro',
    'durante',
    'almeno',
    'secondo',
    'anzi',
    'oramai',
    'oltre',
    'intorno',
    'sopra',
    'dietro',
    'davanti',
    'soltanto',
    'infatti',
    'qualcosa',
    'spesso',
    'accordo',
    'ieri',
    'davvero',
    'qualcuno',
    'avanti',
    'assai',
    'presto',
    'qua',
    'domani',
    'circa',
    'giù',
    'soprattutto',
    'nemmeno',
    'grazie',
    'tuttavia',
    'appunto',
    'neppure',
    'veramente',
    'tardi',
    'insomma',
    'presso',
    'intanto',
    'lungo',
    'neanche',
    'piuttosto',
    'stasera',
    'perciò',
    'naturalmente',
    'accanto',
    'eppure',
    'eccetera',
    'finalmente',
    'infine',
    'poiché',
    'comunque',
    'dinanzi',
    'abbastanza',
    'peccato',
    'certamente',
    'coloro',
    'attorno',
    'magari',
    'oppure',
    'inoltre',
    'indietro',
    'addosso',
    'addirittura',
    'finché',
    'perfino',
    'affatto',
    'stamattina',
    'completamente',
    'probabilmente',
    'chissà',
    'sino',
    'ognuno',
    'entro',
    "alberi",
    "amici",
    "animali",
    "anniversari",
    "appartamenti",
    "automobili",
    "biciclette",
    "biglietti",
    "birre",
    "borse",
    "bottiglie",
    "braccia",
    "camicie",
    "cani",
    "cappelli",
    "carri",
    "case",
    "cavalli",
    "cesti",
    "chiodi",
    "cibi",
    "cucchiai",
    "dolci",
    "fagioli",
    "gatti",
    "guanti",
    "letti",
    "libri",
    "magliette",
    "matite",
    "mele",
    "modelli",
    "occhiali",
    "orologi",
    "orecchini",
    "palloncini",
    "pantaloni",
    "penne",
    "piatti",
    "polli",
    "portafogli",
    "portachiavi",
    "quadri",
    "ragazzi",
    "regali",
    "sedie",
    "soldi",
    "spaghetti",
    "tavoli",
    "telefonini",
    "uccelli",
    "zaini",
    "abiti",
    "acquerelli",
    "alberelli",
    "angeli",
    "archi",
    "bicchieri",
    "camini",
    "castelli",
    "coltelli",
    "cuscini",
    "divani",
    "fiumi",
    "fiori",
    "gomme",
    "grattacieli",
    "gufi",
    "laghi",
    "libretti",
    "mani",
    "nuvole",
    "occhi",
    "orsetti",
    "orecchie",
    "pagliacci",
    "panni",
    "ponti",
    "portoni",
    "quaderni",
    "raggi",
    "rametti",
    "rami",
    "sassi",
    "segreti",
    "sorrisi",
    "tappeti",
    "treni",
    "uffici",
    "vasi",
    "vestiti",
    "volti",
    "zucche",
    'cose',
'anni',
'uomini',
'giorni',
'volte',
'case',
'parti',
'vite',
'tempi',
'donne',
'mani',
'occhi',
'ore',
'signori',
'paesi',
'momenti',
'modi',
'mondi',
'parole',
'padri',
'punti',
'lavori',
'stati',
'casi',
'guerre',
'strade',
'figli',
'notti',
'voci',
'nomi',
'sere',
'acque',
'amici',
'fatti',
'gente',
'amori',
'storie',
'arie',
'forze',
'teste',
'ragioni',
'mari',
'mesi',
'capi',
'soli',
'famiglie',
'piedi',
'persone',
'vie',
'signore',
'governi',
'sensi',
'opere',
'prodotti',
'feste',
'giochi',
'prove',
'campagne',
'fiori',
'misure',
'posizioni',
'nature',
'uffici',
'specie',
'successi',
'zone',
'fuochi',
'soldati',
'viste',
'libertà',
'risultati',
'dubbi',
'ricerche',
'figure',
'piazze',
'questioni',
'nemici',
'pene',
'motivi',
'esperienze',
'ricordi',
'alberi',
'politiche',
'processi',
'vini',
'porte',
'sogni',
'cani',
'isole',
'movimenti',
'menti',
'occasioni',
'prezzi',
'cause',
'periodi',
'sviluppi',
'sorelle',
'effetti',
'giardini',
'volti',
'basi',
'caratteri',
'coscienze',
'guardie',
'memorie',
'terreni',
'animali',
'direzioni',
'eccellenze',
'malattie',
'scienze',
'funzioni',
'conseguenze',
'pareti',
'denti',
'alberghi',
'gioie',
'argomenti',
'sguardi',
'relazioni',
'classi',
'battaglie',
'visi',
'gesti',
'mattini',
'opinioni',
'ponti',
'sorrisi',
'frasi',
'limiti',
'ritorni',
'boschi',
'esami',
'lati',
'operazioni',
'pranzi',
'coste',
'prati',
'repubbliche',
'valli',
'fatiche',
'odori',
'articoli',
'costruzioni',
'rivoluzioni',
'zie',
'confronti',
'potenze',
'sforzi',
'sicurezze',
'ufficiali',
'crisi',
'cucine',
'gatti',
'territori',
'attimi',
'contatti',
'errori',
'intenzioni',
'culture',
'giudizi',
'spese',
'aiuti',
'ambienti',
'anime',
'bestie',
'cortili',
'pelli',
'proposte',
'rive',
'segretari',
'abiti',
'chiavi',
'correnti',
'operai',
'corsi',
'finestre',
'arti',
'sistemi',
'piani',
'bocche',
'anime',
'palazzi',
'passi',
'giornate',
'servizi',
'rapporti',
'milioni',
'stanze',
'valori',
'colpi',
'interessi',
'spalle',
'silenzi',
'signorine',
'ombre',
'azioni',
'venti',
'mattine',
'colori',
'presidenti',
'consigli',
'principi',
'viaggi',
'generi',
'giornali',
'spiriti',
'cavalli',
'muri',
'situazioni',
'linee',
'giri',
'automobili',
'atti',
'aspetti',
'fortune',
'partiti',
'macchine',
'carte',
'minuti',
'tratti',
'settimane',
'notizie',
'fratelli',
'industrie',
'piaceri',
'maestri',
'personaggi',
'pomeriggi',
'fianchi',
'bambine',
'bellezze',
'domande',
'piante',
'pubblici',
'sedi',
'affari',
'beni',
'fiumi',
'lotte',
'mercati',
'angoli',
'compagnie',
'espressioni',
'ville',
'desideri',
'serie',
'visite',
'coraggio',
'direttori',
'eserciti',
'gradi',
'padroni',
'risposte',
'tavole',
'immagini',
'montagne',
'energie',
'fedi',
'pani',
'seguiti',
'estati',
'film',
'frutti',
'onori',
'pericoli',
'scrittori',
'colline',
'zii',
'difese',
'metri',
'colli',
'cure',
'disposizioni',
'Domeniche',
'giovanotti',
'poeti',
'stagioni',
'pesi',
'toni',
'croci',
'decisioni',
'poesie',
'fiducie',
'fili',
'folle',
'qualità',
'robe',

  ]
}