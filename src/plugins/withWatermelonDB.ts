import { withAppBuildGradle, withMainApplication, withSettingsGradle } from '@expo/config-plugins';
import type { ExpoConfig } from '@expo/config-types';
import withBuildProperties from 'expo-build-properties';

// ref: https://github.com/LovesWorking/watermelondb-expo-plugin-sdk-52-plus
// ref: https://github.com/morrowdigital/watermelondb-expo-plugin

// 2. In android/settings.gradle, add:
function settingGradle(gradleConfig: ExpoConfig): ExpoConfig {
  return withSettingsGradle(gradleConfig, (mod) => {
    if (!mod.modResults.contents.includes(':watermelondb-jsi')) {
      console.log('[WatermelonDB] Adding watermelondb-jsi to settings.gradle');

      // Keep original implementation but with logging
      mod.modResults.contents += `
include ':watermelondb-jsi'
project(':watermelondb-jsi').projectDir = new File(["node", "--print", "require.resolve('@nozbe/watermelondb/package.json')"].execute(null, rootProject.projectDir).text.trim(), "../native/android-jsi")`;
      console.log('[WatermelonDB] Successfully added watermelondb-jsi configuration');
    } else {
      console.log('[WatermelonDB] watermelondb-jsi already configured in settings.gradle');
    }
    return mod;
  }) as ExpoConfig;
}

// 3. In android/app/build.gradle, add:
function addWatermelonDBJSIDependency(config: ExpoConfig): ExpoConfig {
  return withAppBuildGradle(config, (mod) => {
    console.log(
      '[WatermelonDB] Checking android/app/build.gradle configuration for watermelondb-jsi dependency...'
    );

    const hasWatermelonDBJSIDependency = mod.modResults.contents.includes(
      "implementation project(':watermelondb-jsi')"
    );
    if (hasWatermelonDBJSIDependency) {
      console.log('[WatermelonDB] watermelondb-jsi dependency already exists');
      return mod;
    }

    console.log('[WatermelonDB] Adding watermelondb-jsi implementation to dependencies');
    mod.modResults.contents = mod.modResults.contents.replace(
      'dependencies {',
      `dependencies {
          implementation project(':watermelondb-jsi')
      `
    );
    console.log('[WatermelonDB] Successfully added watermelondb-jsi dependency');

    return mod;
  }) as ExpoConfig;
}

// https://github.com/morrowdigital/watermelondb-expo-plugin/pull/51/files#diff-ac4d678cfe00980f9ba9c66167516e4ab4139b78c94ff9c5083553ae8ad1f79e
function mainApplicationSDK52(config: ExpoConfig): ExpoConfig {
  return withMainApplication(config, (mod) => {
    if (
      !mod.modResults.contents.includes('import com.nozbe.watermelondb.jsi.WatermelonDBJSIPackage')
    ) {
      mod.modResults.contents = mod.modResults.contents.replace(
        'import android.app.Application',
        `import android.app.Application
import com.nozbe.watermelondb.jsi.WatermelonDBJSIPackage;`
      );
    }

    if (!mod.modResults.contents.includes('packages.add(WatermelonDBJSIPackage())')) {
      const newContents2 = mod.modResults.contents.replace(
        'return packages',
        `
            packages.add(WatermelonDBJSIPackage())
            return packages`
      );
      mod.modResults.contents = newContents2;
    }

    return mod;
  }) as ExpoConfig;
}

const withWatermelonDB = (config: ExpoConfig) => {
  let currentConfig: ExpoConfig = config;

  currentConfig = withBuildProperties(currentConfig, {
    android: {
      packagingOptions: { pickFirst: ['**/libc++_shared.so'] },
      extraProguardRules: '-keep class com.nozbe.watermelondb.** { *; }',
    },
  });
  currentConfig = settingGradle(currentConfig);
  currentConfig = addWatermelonDBJSIDependency(currentConfig);
  // Only manual link package on sdk 52+ as descripted here:
  // https://github.com/Nozbe/WatermelonDB/issues/1769#issuecomment-2600274652
  currentConfig = mainApplicationSDK52(currentConfig);

  return currentConfig as ExpoConfig;
};

module.exports = withWatermelonDB;
