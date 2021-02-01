export class Feature {
    bpm: number;
    key: string;
    scale: string; 

    getBpm(){
      return this.bpm;
    }
  
    getKey(){
      return this.key;
    }
  
    getScale(){
      return this.scale;
    }

  }