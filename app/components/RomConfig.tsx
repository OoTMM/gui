import React from 'react';
import { useGenerator, useIsPatch, useRomConfig } from '../contexts/GeneratorContext';
import { Checkbox } from './Checkbox';

import { FileSelect } from './FileSelect';

export function RomConfig() {
  const { romConfig, setFile, setSeed } = useRomConfig();
  const [isPatch, setIsPatch] = useIsPatch();
  const { error, generate } = useGenerator();

  return <>
    <h1>OoTMM Web Generator</h1>
    <h4>&nbsp; -version: {process.env.VERSION}</h4>   {/* is this okay? */}
    {error && <div className="generator-error">{error}</div>}
    <form target="_self" onSubmit={(e) => { e.preventDefault(); generate(); }}>
      <div className="flex-roms">
        <FileSelect logo="oot" label="Ocarina of Time [1.0 U/J]" accept=".z64, .n64, .v64" file={romConfig.files.oot} onChange={(f) => setFile('oot', f)}/>
        <FileSelect logo="mm" label="Majora's Mask [U only]" accept=".z64, .n64, .v64" file={romConfig.files.mm} onChange={(f) => setFile('mm', f)} />
        {isPatch && <FileSelect logo="ootmm" label="OoTMM Patch File" accept=".ootmm" file={romConfig.files.patch} onChange={(f) => setFile('patch', f)}/>}
      </div>
      <div className="patch-checkbox-align">
        <Checkbox label="Use a patch file" checked={isPatch} onChange={setIsPatch}/>
      </div>
      {!isPatch && <label>
        Seed: &nbsp;&nbsp;[leave blank to auto-generate] {/* is this double space okay? */}
        <input
          type="text"
          value={romConfig.seed}
          onChange={(e) => setSeed(e.target.value)}
        />
      </label>}
      <button className="btn-primary sm-margin-top" type="submit">
        Generate
      </button>
    </form>
  </>
}
