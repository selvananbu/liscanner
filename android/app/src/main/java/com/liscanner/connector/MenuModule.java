package com.liscanner.connector;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.liscanner.MainActivity;
import com.reactlibrary.JSBundleManager;
import com.reactlibrary.JSBundleManagerActivity;
import com.reactlibrary.view.ListConnectionActivity;
import com.reactlibrary.view.NewConnectionActivity;

import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;
import static com.liscanner.MainActivity.menuString;
import static com.reactlibrary.util.FileUtil.isFileExistInDevice;
import static com.reactlibrary.view.ListConnectionActivity.versionList;

public class MenuModule extends ReactContextBaseJavaModule {

    ReactApplicationContext mreactContext;
    public static boolean isAlreadyCalled = false;

    public MenuModule(ReactApplicationContext reactContext, Context context) {
        super(reactContext);
        mreactContext = reactContext;

    }
  @Override
    public String getName() {
        return "MenuExample";
    }

    @ReactMethod
    public void closeApp(){
        getCurrentActivity().onBackPressed();
    }

    @ReactMethod
    public void showToast(String message){
        Toast toast = Toast.makeText(mreactContext, message, Toast.LENGTH_SHORT);
        toast.show();
    }

@ReactMethod
   public void show(String message) {
    String[] menuList = message.split(",");
    for (String menu:menuList) {
        menuString.add(menu);
    }
    final MainActivity activity = (MainActivity) getCurrentActivity();
    if(activity != null){
        runOnUiThread(new Runnable() {
            @Override
            public void run() {

                activity.initializeDynamicMenu();
                activity.setMenuContext(mreactContext);
            }
        });
    }
   }
    @ReactMethod
    public void startConnectionActivity(){
        if(mreactContext != null && !isFileExistInDevice(mreactContext)){
            Intent newconnectionIntent = new Intent(getCurrentActivity(), NewConnectionActivity.class);
            getCurrentActivity().startActivityForResult(newconnectionIntent, 2);
        }
        else{
            Intent listconnectionIntent = new Intent(getCurrentActivity(), ListConnectionActivity.class);
            getCurrentActivity().startActivityForResult(listconnectionIntent, 2);
        }

    }
}
