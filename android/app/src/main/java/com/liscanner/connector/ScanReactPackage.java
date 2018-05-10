package com.liscanner.connector;

/**
 * Created by selvaanb on 4/22/2018.
 */

import android.content.Context;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ScanReactPackage implements ReactPackage {

    private Context mActivity = null;

    public ScanReactPackage(Context activity) {
        mActivity = activity;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();

        modules.add(new ScanModule(reactContext,mActivity));



        return modules;
    }

}

