import Essentia from "./core_api";
/**
 * EssentiaExtractor
 * This class provides one-liner methods which implements the whole chain of algorithms required for computing features such as log-scaled mel spectrogram, HPCP chroma features etc This can be extended according to your needs.
 * @class
 * @extends {Essentia}
 */
declare class EssentiaExtractor extends Essentia {
    EssentiaWASM: any;
    isDebug: boolean;
    sampleRate: any;
    frameSize: any;
    profile: any;
    /**
     *Creates an instance of EssentiaExtractor.
    * @param {*} EssentiaWASM
    * @param {boolean} [isDebug=false]
    * @constructs
    */
    constructor(EssentiaWASM: any, isDebug?: boolean);
    /**
     * Compute log-scaled mel spectrogram for a given audio signal frame along with an optional extractor profile configuration
     * @method
     * @param {Float32Array} audioFrame a frame of decoded audio signal as Float32 typed array.
     * @param {number} sampleRate Sample rate of the input audio signal.
     * @param {boolean} [asVector=false] whether to output the spectrogram as a vector float type for chaining with other essentia algorithms.
     * @param {*} [config=this.profile]
     * @returns {Array} Log-scaled Mel Spectrum
     * @memberof EssentiaExtractor
     */
    melSpectrumExtractor(audioFrame: Float32Array, sampleRate?: number, asVector?: boolean, config?: any): any;
    /**
     * Compute HPCP chroma feature for a given audio signal frame along with an optional extractor profile configuration
     * @method
     * @param {Float32Array} audioFrame a decoded audio signal frame as Float32 typed array.
     * @param {number} sampleRate Sample rate of the input audio signal.
     * @param {boolean} [asVector=false] whether to output the hpcpgram as a vector float type for chaining with other essentia algorithms.
     * @param {*} [config=this.profile]
     * @returns {Array} Frame-wise HPCP
     * @memberof EssentiaExtractor
     */
    hpcpExtractor(audioFrame: Float32Array, sampleRate?: number, asVector?: boolean, config?: any): any;
}
export default EssentiaExtractor;
