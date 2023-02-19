import React from 'react';
import { Dropdown } from './Dropdown';
import { FileSelect } from './FileSelect';

import { SETTINGS_PRESETS } from '@ootmm/core';

const preparePresetList = (settingsPresetsImported) => {
  const selectPresetLabel = {name: "Select a Preset", value: "Select a Preset", settings: {}};
  const settingsPresetsFormatted = Object.keys(settingsPresetsImported).map(
    (k) => { return { name: k, value: k, settings: settingsPresetsImported[k] };
  })
  const settingsPresets = [selectPresetLabel, ...settingsPresetsFormatted];
  return settingsPresets;
}
const settingsPresets = preparePresetList(SETTINGS_PRESETS || {});

export const RomConfig = ({
  roms,
  setRom,
  seed,
  setSeed,
  setSetting,
  error,
  onGenerate,
}) => {

  const loadPreset = (presetName) => {
    const preset = SETTINGS_PRESETS[presetName] || {};
    console.log("Loaded preset:", preset);
    setSetting(preset);
  };

  return (
    <div>
      {error && <div className="generator-error">{error}</div>}
      <form
        target="_self"
        onSubmit={(e) => {
          e.preventDefault();
          onGenerate();
        }}
      >
        <div className="flex-h">
          <FileSelect
            game="oot"
            label="Ocarina of Time (1.0, U or J)"
            file={roms.oot}
            onChange={(f) => setRom('oot', f)}
          />
          <FileSelect
            game="mm"
            label="Majora's Mask (U only)"
            file={roms.mm}
            onChange={(f) => setRom('mm', f)}
          />
        </div>
        <Dropdown
          key={"settingspresets"}
          label={"Settings Preset (if you need settings suggestions!)"}
          options={settingsPresets}
          onChange={(v) => loadPreset(v)}
        />
        <label className="sm-margin-top">
          Seed (leave blank to auto-generate)
          <input
            type="text"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
          />
        </label>
        <button className="btn-primary sm-margin-top" type="submit">
          Generate
        </button>
      </form>
    </div>
  );
};
