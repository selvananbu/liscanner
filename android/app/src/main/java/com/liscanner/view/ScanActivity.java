package com.liscanner.view;

import android.content.ComponentName;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.os.Bundle;
import android.os.Parcelable;
import android.preference.PreferenceManager;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;
import com.liscanner.R;

import java.util.ArrayList;
import java.util.List;

import static android.content.pm.PackageManager.GET_RESOLVED_FILTER;

public class ScanActivity extends AppCompatActivity {

    public ReactApplicationContext getMenuContext() {
        return menuContext;
    }

    public static ReactApplicationContext menuContext;
    public String mkey;
    public String mvalue;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_scan);

        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        SharedPreferences myPrefs = PreferenceManager.getDefaultSharedPreferences(getBaseContext());
        boolean vibrate = myPrefs.getBoolean("notification_Scanner_vibrate",true);

//                IntentIntegrator integrator = new IntentIntegrator(this);
//        integrator.setPrompt("Scan a barcode");
//        if(vibrate)
//            integrator.setBeepEnabled(false);

//        Intent scanIntent = getIntent();
//        if(scanIntent.hasExtra("isScan") && scanIntent.getExtras().get("isScan").toString() == "true") {
//            if (scanIntent.hasExtra("key")) {
//                String key = scanIntent.getExtras().get("key").toString();
//                if (key != null) {
//                    mkey = key;
//                    if (scanIntent.hasExtra("value")) {
//                        String value = scanIntent.getExtras().get("value").toString();
//                        if (value != null) {
//                            mvalue = value;
//                        }
//                    }
//                    integrator.initiateScan();
//                }
//            }
//        }

        WritableMap params = Arguments.createMap();
        params.putString("key",mkey);
        Intent scanIntent = getIntent();
        if(scanIntent != null && scanIntent.hasExtra("value")) {
            String value = scanIntent.getExtras().get("value").toString();
            if (value != null) {
                params.putString("rackId",value);
            }
        }

        params.putString("result","708080");
        getMenuContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("showResult",params);
        finish();


//        SharedPreferences myPrefs = PreferenceManager.getDefaultSharedPreferences(getBaseContext());
//        boolean vibrate = myPrefs.getBoolean("notification_Scanner_vibrate",true);
//
//        IntentIntegrator integrator = new IntentIntegrator(this);
//        integrator.setPrompt("Scan a barcode");
//        if(vibrate)
//            integrator.setBeepEnabled(false);
//
//        Intent scanIntent = getIntent();
//        if(scanIntent.hasExtra("isScan") && scanIntent.getExtras().get("isScan").toString() == "true"){
//            if(scanIntent.hasExtra("key")){
//                String key = scanIntent.getExtras().get("key").toString();
//                if(key != null){
//                    mkey = key;
//                    if(scanIntent.hasExtra("value")){
//                        String value = scanIntent.getExtras().get("value").toString();
//                        if(value != null){
//                            mvalue = value;
//                        }
//                    }
//                    integrator.initiateScan();
//                }
//            }
//        }
//        else{
//            if(scanIntent.hasExtra("rack") && scanIntent.hasExtra("item")) {
//                String rack = scanIntent.getExtras().get("rack").toString();
//                String item = scanIntent.getExtras().get("item").toString();
//                Intent orderIntent = new Intent(Intent.ACTION_SEND);
//                List<Intent> shareIntentsLists = new ArrayList<Intent>();
//
//                PackageManager packageManager = getPackageManager();
//                orderIntent.putExtra("Order",rack);
//                orderIntent.putExtra("Item",item);
//                orderIntent.setType("application/vnd.lisec");
//                List<ResolveInfo> activities = packageManager.queryIntentActivities(orderIntent,GET_RESOLVED_FILTER);
//
//                for (ResolveInfo resInfo : activities) {
//                    String packageName = resInfo.activityInfo.packageName;
//                    if (packageName.toLowerCase().contains("liorder") || packageName.toLowerCase().contains("memo") || packageName.toLowerCase().contains("testlib5"))
//                    {
//                        resInfo.filter.countDataTypes();
//                        Intent intent = new Intent();
//                        intent.setComponent(new ComponentName(packageName, resInfo.activityInfo.name));
//                        intent.setAction(Intent.ACTION_SEND);
//                        intent.setType("application/vnd.lisec");
//                        intent.putExtra("Rack",rack);
//                        intent.putExtra("Item",item);
//                        intent.putExtra("Order","4565232");
//                        intent.putExtra("Details","Details of Order , Rack and Item No....");
//                        intent.setPackage(packageName);
//                        shareIntentsLists.add(intent);
//                    }
//                }
//
//                boolean isIntentSafe = activities.size() > 0;
//                if (isIntentSafe) {
//                    String title = getResources().getString(R.string.chooser_title);
//                    Intent chooser = Intent.createChooser(shareIntentsLists.remove(0), title);
//                    chooser.putExtra(Intent.EXTRA_INITIAL_INTENTS, shareIntentsLists.toArray(new Parcelable[]{}));
//
//                    startActivity(chooser);
//                    finish();
//                }
//            } else if(scanIntent.hasExtra("showtoast")){
//                showProgressToast(R.string.error_barcode_missing);
//                WritableMap params = Arguments.createMap();
//                getMenuContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                        .emit("showResult",params);
//                finish();
//            }
//        }
    }

    public void showProgressToast(int message) {
        if (menuContext.getResources().getString(message).length() > 0) {
            int duration = Toast.LENGTH_SHORT;
            Toast toast = Toast.makeText(menuContext, message, duration);
            toast.show();
        }
    }
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        IntentResult result = IntentIntegrator.parseActivityResult(requestCode, resultCode, data);
        if(result != null) {
            if(result.getContents() == null) {
                WritableMap params = Arguments.createMap();
                getMenuContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("showResult",params);

            } else {
                        WritableMap params = Arguments.createMap();
                        params.putString("key",mkey);
//                        if(mvalue != null && !mvalue.isEmpty()){
//                            params.putString("value",mvalue);
//                        }
                        params.putString("result",result.getContents().toString());
                        getMenuContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                                .emit("showResult",params);
                }
            }
        finish();
    }

}
