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

    setBpm(bpm: number){
      this.bpm = bpm;
    }
  
    setKey(key: string){
      this.key = key;
    }
  
    setScale(scale: string){
      this.scale = scale;
    }

  }