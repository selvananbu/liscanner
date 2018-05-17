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

    IntentIntegrator integrator = new IntentIntegrator(this);
    integrator.setPrompt("Scan a barcode");
    if(vibrate)
    integrator.setBeepEnabled(false);
    Intent scanIntent = getIntent();
    if(scanIntent != null && scanIntent.hasExtra("key")){
      String key = scanIntent.getExtras().get("key").toString();
      if(key != null){
        mkey = key;
      }
    }
    integrator.initiateScan();
      // {
      //     WritableMap params = Arguments.createMap();
      //     if(mkey.equals("RACK"))
      //     {
      //         params.putString("result","69672101");
      //         params.putString("key",mkey);
      //     }
      //     else {
      //         params.putString("result","70807605");
      //         params.putString("key",mkey);
      //     }
      //     getMenuContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      //             .emit("showResult",params);

      // }
      // finish();
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
    if(data == null){
      WritableMap params = Arguments.createMap();
      getMenuContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
              .emit("showItemReady",params);
      Toast toast = Toast.makeText(this, "Scan Operation Canceled", Toast.LENGTH_SHORT);
      toast.show();
    }
    else if(result != null) {
      WritableMap params = Arguments.createMap();
      if(result.getContents() != null){
        params.putString("result",result.getContents().toString());
        params.putString("key",mkey);
      }
      getMenuContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
              .emit("showResult",params);

    }
    finish();
  }

}
