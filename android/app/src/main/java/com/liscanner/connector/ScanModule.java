package com.liscanner.connector;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.ResolveInfo;
import android.os.Build;
import android.os.Parcelable;
import android.os.Vibrator;
import android.preference.PreferenceManager;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.liscanner.view.ScanActivity;
import com.liscanner.view.settings.SettingsActivity;
import com.liscanner.view.settings.SettingsActivity_test;

import java.util.ArrayList;
import java.util.List;

import static android.R.attr.duration;
import static android.content.Context.VIBRATOR_SERVICE;
import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;

/**
 * Created by selvaanb on 3/22/2018.
 */

public class ScanModule extends ReactContextBaseJavaModule {

    public void setMreactContext(ReactApplicationContext mreactContext) {
        this.mreactContext = mreactContext;
    }

    ReactApplicationContext mreactContext;

    public ScanModule(ReactApplicationContext reactContext, Context mActivity) {
        super(reactContext);
        setMreactContext((ReactApplicationContext) reactContext);
    }

    @Override
    public String getName() {
        return "ScanExample";
    }

    @ReactMethod
    void startScan(String key){
        Intent scanActivity = new Intent(getCurrentActivity(), ScanActivity.class);
        scanActivity.putExtra("key",key);
        ScanActivity.menuContext = mreactContext;
        getCurrentActivity().startActivity(scanActivity);

    }

    @ReactMethod
    void startSettings(){
        Intent settingIntent = new Intent(getCurrentActivity(), SettingsActivity_test.class);
        getCurrentActivity().startActivityForResult(settingIntent, 2);
    }

    @ReactMethod
    void startGraphicsViewer(String datauri){
        Intent sendIntent = new Intent();
        List<Intent> targetedShareIntents = new ArrayList<Intent>();
        String title = "View " + datauri + " Order in ....";
        sendIntent.setAction(Intent.ACTION_SEND);
        sendIntent.putExtra("Order No", datauri);
        sendIntent.setType("text/plain");
        List<ResolveInfo> resInfo = getCurrentActivity().getPackageManager().queryIntentActivities(sendIntent, 0);
        if (!resInfo.isEmpty()) {
            for (ResolveInfo resolveInfo : resInfo) {
                String packageName = resolveInfo.activityInfo.packageName;
                Intent targetedShareIntent = new Intent(android.content.Intent.ACTION_SEND);
                targetedShareIntent.setType("text/plain");
                if ((TextUtils.equals(packageName, "com.ligraphicsviewer" ))|| (TextUtils.equals(resolveInfo.activityInfo.processName,"com.google.android.apps.docs:Clipboard" )))
                {
                    targetedShareIntent.setPackage(packageName);
                    targetedShareIntent.putExtra("Order No", datauri);
                    targetedShareIntents.add(targetedShareIntent);
                }
            }
        }
        Intent chooserIntent = Intent.createChooser(targetedShareIntents.remove(0), title);
        chooserIntent.putExtra(Intent.EXTRA_INITIAL_INTENTS, targetedShareIntents.toArray(new Parcelable[targetedShareIntents.size()]));
        getCurrentActivity().startActivity(chooserIntent);
    }

    @ReactMethod
    void startOrderApp(String rack,String item){
        Intent scanActivity = new Intent(getCurrentActivity(), ScanActivity.class);
        ScanActivity.menuContext = mreactContext;
        if(rack != null && item != null){
            scanActivity.putExtra("rack",rack);
            scanActivity.putExtra("item",item);
        }
        else{
            scanActivity.putExtra("rack","12345");
            scanActivity.putExtra("item","45623");
        }
        scanActivity.putExtra("isScan",false);
        getCurrentActivity().startActivity(scanActivity);
    }

    @ReactMethod
    void setTitle(final String title){
        final Activity activity = getCurrentActivity();
        if(activity!=null){
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    activity.setTitle(title);
                }
            });
        }
    }

    @ReactMethod
    void startVibrate(){
        Toast toast = Toast.makeText(getReactApplicationContext(), "No Order Present for Scanned Barcode..", Toast.LENGTH_SHORT);
        toast.show();
        SharedPreferences myPrefs = PreferenceManager.getDefaultSharedPreferences(getReactApplicationContext());
        boolean vibrate = myPrefs.getBoolean("notifications_new_message_vibrate",true);
        if(!vibrate) return;
        if (Build.VERSION.SDK_INT >= 26) {
            ((Vibrator) getReactApplicationContext().getSystemService(VIBRATOR_SERVICE)).vibrate(200);          //@Need to check
        } else {
            ((Vibrator)  getReactApplicationContext().getSystemService(VIBRATOR_SERVICE)).vibrate(150);
        }
    }


}
