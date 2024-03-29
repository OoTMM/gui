import React from 'react';
import { SETTINGS, SETTINGS_CATEGORIES } from '@ootmm/core';

import { Dropdown } from './Dropdown';
import { Checkbox } from './Checkbox';
import { useSettings } from '../contexts/GeneratorContext';

type SettingsPanelProps = {
  category: string;
};
export function SettingsPanel({ category }: SettingsPanelProps) {
  const [settings, setSettings] = useSettings();
  const settingsData = SETTINGS.filter((s) => s.category === category);
  const enumList = settingsData.filter((x) => x.type === 'enum');
  const booleanList = settingsData.filter((x) => x.type === 'boolean');

  return (
    <form className="settings">
      {booleanList.length > 0 && (
        <div className="checkboxes-lowcount">
          {booleanList.map((setting) => (
            <Checkbox
              key={setting.key}
              label={setting.name}
              checked={settings[setting.key] as boolean}
              onChange={(v) => setSettings({ [setting.key]: v })}
            />
          ))}
        </div>
      )}
      {enumList.length > 0 && (
        <div className="three-column-grid">
          {enumList.map((setting) => (
            <Dropdown
              value={settings[setting.key] as string}
              key={setting.key}
              label={setting.name}
              options={(setting as any).values}
              onChange={(v) => setSettings({ [setting.key]: v })}
            />
          ))}
        </div>
      )}
    </form>
  );
};

type SettingsEditorProps = {
  category: string;
};
export function SettingsEditor({ category }: SettingsEditorProps) {
  const cat = SETTINGS_CATEGORIES.find(x => x.key === category)!;
  const subcategories = cat.subcategories || [];
  return (
    <>
      <SettingsPanel category={category}/>
      {subcategories.map(sub => <div className='settings-group'>
        <h2>{sub.name}</h2>
        <SettingsPanel key={sub.key} category={`${category}.${sub.key}`}/>
      </div>)}
    </>
  )
}
