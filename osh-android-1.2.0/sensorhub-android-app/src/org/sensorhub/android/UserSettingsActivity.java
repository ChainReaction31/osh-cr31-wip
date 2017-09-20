/***************************** BEGIN LICENSE BLOCK ***************************

The contents of this file are subject to the Mozilla Public License, v. 2.0.
If a copy of the MPL was not distributed with this file, You can obtain one
at http://mozilla.org/MPL/2.0/.

Software distributed under the License is distributed on an "AS IS" basis,
WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
for the specific language governing rights and limitations under the License.
 
Copyright (C) 2012-2015 Sensia Software LLC. All Rights Reserved.
 
******************************* END LICENSE BLOCK ***************************/

package org.sensorhub.android;

import android.annotation.TargetApi;
import android.app.AlertDialog;
import android.os.Build;
import android.os.Bundle;
import android.preference.ListPreference;
import android.preference.Preference;
import android.preference.PreferenceActivity;
import android.preference.PreferenceFragment;
import android.preference.PreferenceManager;
import java.net.URL;
import java.util.List;


public class UserSettingsActivity extends PreferenceActivity
{
    
    @Override
    public void onBuildHeaders(List<Header> target)
    {
        loadHeadersFromResource(R.xml.pref_headers, target);
    }

    
    /*
     * A preference value change listener that updates the preference's summary to reflect its new value.
     */
    private static Preference.OnPreferenceChangeListener sBindPreferenceSummaryToValueListener = new Preference.OnPreferenceChangeListener()
    {
        @Override
        public boolean onPreferenceChange(Preference preference, Object value)
        {
            String stringValue = value.toString();
            
            if (preference instanceof ListPreference)
            {
                ListPreference listPreference = (ListPreference) preference;
                int index = listPreference.findIndexOfValue(stringValue);
                preference.setSummary(index >= 0 ? listPreference.getEntries()[index] : null);
            }
            else
            {
                preference.setSummary(stringValue);
            }
            
            // detect errors
            if (preference.getKey().equals("sos_uri"))
            {
                try
                {
                    URL url = new URL(value.toString());
                    if (!url.getProtocol().equals("http") && !url.getProtocol().equals("https"))
                        throw new Exception("SOS URL must be HTTP or HTTPS");
                }
                catch (Exception e)
                {
                    AlertDialog.Builder dlgAlert  = new AlertDialog.Builder(preference.getContext());
                    dlgAlert.setMessage("Invalid SOS URL");
                    dlgAlert.setTitle(e.getMessage());
                    dlgAlert.setPositiveButton("OK", null);
                    dlgAlert.setCancelable(true);
                    dlgAlert.create().show();                
                }
            }
            
            return true;
        }
    };


    /*
     * Binds a preference's summary to its value. More specifically, when the
     * preference's value is changed, its summary (line of text below the
     * preference title) is updated to reflect the value. The summary is also
     * immediately updated upon calling this method. The exact display format is
     * dependent on the type of preference.
     *
     * @see #sBindPreferenceSummaryToValueListener
     */
    private static void bindPreferenceSummaryToValue(Preference preference)
    {
        // Set the listener to watch for value changes.
        preference.setOnPreferenceChangeListener(sBindPreferenceSummaryToValueListener);

        // Trigger the listener immediately with the preference's
        // current value.
        sBindPreferenceSummaryToValueListener.onPreferenceChange(preference, PreferenceManager.getDefaultSharedPreferences(preference.getContext()).getString(preference.getKey(), ""));
    }
    

    /*
     * Fragment for general preferences
     */
    @TargetApi(Build.VERSION_CODES.HONEYCOMB)
    public static class GeneralPreferenceFragment extends PreferenceFragment
    {
        @Override
        public void onCreate(Bundle savedInstanceState)
        {
            super.onCreate(savedInstanceState);
            addPreferencesFromResource(R.xml.pref_general);
            bindPreferenceSummaryToValue(findPreference("device_name"));
            bindPreferenceSummaryToValue(findPreference("sos_uri"));
            bindPreferenceSummaryToValue(findPreference("sos_username"));
        }
    }
    
    
    /*
     * Fragment for sensor preferences
     */
    @TargetApi(Build.VERSION_CODES.HONEYCOMB)
    public static class SensorPreferenceFragment extends PreferenceFragment
    {
        @Override
        public void onCreate(Bundle savedInstanceState)
        {
            super.onCreate(savedInstanceState);
            addPreferencesFromResource(R.xml.pref_sensors);
            bindPreferenceSummaryToValue(findPreference("video_codec"));
            bindPreferenceSummaryToValue(findPreference("angel_address"));
        }
    }


    @Override
    protected boolean isValidFragment(String fragmentName)
    {
        return true;
    }
}
