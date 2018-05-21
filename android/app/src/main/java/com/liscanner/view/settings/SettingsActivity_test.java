package com.liscanner.view.settings;

import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.media.Ringtone;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.preference.EditTextPreference;
import android.preference.ListPreference;
import android.preference.Preference;
import android.preference.PreferenceFragment;
import android.preference.PreferenceManager;
import android.preference.RingtonePreference;
import android.support.v7.widget.Toolbar;
import android.text.TextUtils;
import android.util.TypedValue;
import android.view.MenuItem;
import android.view.ViewGroup;

import com.liscanner.R;

/**
 * Created by selvaanb on 5/21/2018.
 */

public class SettingsActivity_test extends AppCompatPreferenceActivity {
    private static final String TAG = SettingsActivity_test.class.getSimpleName();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setupActionBar();

        // load settings fragment
        getFragmentManager().beginTransaction().replace(android.R.id.content, new MainPreferenceFragment()).commit();
    }
    public static class MainPreferenceFragment extends PreferenceFragment {
        @Override
        public void onCreate(final Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            addPreferencesFromResource(R.xml.pref_main);

            bindPreferenceSummaryToValue(findPreference("key_appversion"));
            bindPreferenceSummaryToValue(findPreference("rackbarcode_length"));
            bindPreferenceSummaryToValue(findPreference("itembarcode_length"));
            bindPreferenceSummaryToValue(findPreference("sync_frequency"));

        }
    }
    private void setupActionBar() {
        getLayoutInflater().inflate(R.layout.toolbar, (ViewGroup)findViewById(android.R.id.content));
        Toolbar toolbar = (Toolbar)findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        int horizontalMargin = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 2, getResources().getDisplayMetrics());
        int verticalMargin = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 2, getResources().getDisplayMetrics());
        int topMargin = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, (int) getResources().getDimension(R.dimen.activity_vertical_margin), getResources().getDisplayMetrics());
        topMargin = topMargin + 15;
        getListView().setPadding(horizontalMargin, topMargin, horizontalMargin, verticalMargin);
        if(toolbar != null){
            setSupportActionBar(toolbar);
        }
    }
    protected boolean isValidFragment(String fragmentName) {
        return PreferenceFragment.class.getName().equals(fragmentName)
                || SettingsActivity.GeneralPreferenceFragment.class.getName().equals(fragmentName)
                || SettingsActivity.DataSyncPreferenceFragment.class.getName().equals(fragmentName)
                || SettingsActivity.NotificationPreferenceFragment.class.getName().equals(fragmentName)
                || SettingsActivity.BarcodePreferenceFragment.class.getName().equals(fragmentName);

    }
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == android.R.id.home) {
            onBackPressed();
        }
        return super.onOptionsItemSelected(item);
    }

    private static void bindPreferenceSummaryToValue(Preference preference) {
        preference.setOnPreferenceChangeListener(sBindPreferenceSummaryToValueListener);

        sBindPreferenceSummaryToValueListener.onPreferenceChange(preference,
                PreferenceManager
                        .getDefaultSharedPreferences(preference.getContext())
                        .getString(preference.getKey(), ""));
    }

    private static Preference.OnPreferenceChangeListener sBindPreferenceSummaryToValueListener = new Preference.OnPreferenceChangeListener() {
        @Override
        public boolean onPreferenceChange(Preference preference, Object value) {
            String stringValue = value.toString();

            if (preference instanceof ListPreference) {
                // For list preferences, look up the correct display value in
                // the preference's 'entries' list.
                ListPreference listPreference = (ListPreference) preference;
                int index = listPreference.findIndexOfValue(stringValue);

                // Set the summary to reflect the new value.
                preference.setSummary(
                        index >= 0
                                ? listPreference.getEntries()[index]
                                : null);

            }
            else if (preference instanceof EditTextPreference) {
                if (preference.getKey().equals("rackbarcode_length") || preference.getKey().equals("itembarcode_length") || preference.getKey().equals("key_appversion")) {
                    // update the changed gallery name to summary filed
                    preference.setSummary(stringValue);
                }
            }else {
                // For all other preferences, set the summary to the value's
                // simple string representation.
                preference.setSummary(stringValue);
            }
            return true;
        }
    };
}
