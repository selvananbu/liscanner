package com.liscanner.connector;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Vibrator;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.liscanner.view.ScanActivity;
import com.reactlibrary.JSBundleManager;

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
    void startScan(String key,String value){
        Intent scanActivity = new Intent(getCurrentActivity(), ScanActivity.class);
        scanActivity.putExtra("key",key);
        scanActivity.putExtra("isScan",true);
        if(value != null)
            scanActivity.putExtra("value",value);
        ScanActivity.menuContext = mreactContext;
        getCurrentActivity().startActivity(scanActivity);

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
        if (Build.VERSION.SDK_INT >= 26) {
            ((Vibrator) getReactApplicationContext().getSystemService(VIBRATOR_SERVICE)).vibrate(200);          //@Need to check
        } else {
            ((Vibrator)  getReactApplicationContext().getSystemService(VIBRATOR_SERVICE)).vibrate(150);
        }
    }


}
