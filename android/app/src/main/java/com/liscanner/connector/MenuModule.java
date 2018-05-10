package com.liscanner.connector;

import android.content.Context;
import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.reactlibrary.view.NewConnectionActivity;

public class MenuModule extends ReactContextBaseJavaModule {

    ReactApplicationContext mreactContext;

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

// @ReactMethod
//    public void show(String message) {
//     if(isAlreadyCalled) return;
//     String[] menuList = message.split(",");
//     for (String menu:menuList) {
//         menuString.add(menu);
//     }
//     final MainActivity activity = (MainActivity) getCurrentActivity();
//     if(activity != null){
//         runOnUiThread(new Runnable() {
//             @Override
//             public void run() {
//
//                 activity.initializeDynamicMenu();
//                 activity.setMenuContext(mreactContext);
//             }
//         });
//     }
//    }

    @ReactMethod
    public void startConnectionActivity(){
        Intent newconnectionIntent = new Intent(getCurrentActivity(), NewConnectionActivity.class);
        getCurrentActivity().startActivityForResult(newconnectionIntent, 2);
    }
}
