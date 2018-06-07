package com.liscanner;

import com.facebook.react.ReactActivity;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.design.widget.NavigationView;
import android.support.v4.app.Fragment;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.SubMenu;
import android.view.View;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.liscanner.connector.MenuModule;
import com.reactlibrary.JSBundleManager;
import com.reactlibrary.JSBundleManagerActivity;
import com.reactlibrary.model.Connection;
import com.reactlibrary.util.FileUtil;
import com.reactlibrary.view.ListConnectionActivity;
import com.reactlibrary.view.NewConnectionActivity;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;

import static com.reactlibrary.JSBundleManager.RNAU_SHARED_PREFERENCES;
import static com.reactlibrary.JSBundleManager.RNAU_STORED_VERSION;
import static com.reactlibrary.util.FileUtil.isFileExistInDevice;
import static com.reactlibrary.util.FileUtil.retrieveConnectionListFromFile;
import static com.reactlibrary.view.ListConnectionActivity.versionList;

public class MainActivity extends JSBundleManagerActivity implements  JSBundleManager.Interface  , DefaultHardwareBackBtnHandler, NavigationView.OnNavigationItemSelectedListener {


    private HelloFragment mViewFragment;
    private ReactInstanceManager mReactInstanceManager;
    public static ArrayList<String> menuString = new ArrayList<>();
    ReactApplicationContext menuContext;

    public void setMenuContext(ReactApplicationContext menuContext) {
        this.menuContext = menuContext;
    }

    public ReactApplicationContext getMenuContext() {
        return menuContext;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        mReactInstanceManager =
                ((MainApplication) getApplication()).getReactNativeHost().getReactInstanceManager();



        mViewFragment = new HelloFragment();

        if (mViewFragment != null) {
            mViewFragment.setMainApplication((ReactApplication) getApplication());
            mViewFragment.setmReactInstanceManager(mReactInstanceManager);
        }
        getSupportFragmentManager().beginTransaction().add(R.id.container, mViewFragment).commit();

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.setDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);
    }




    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem menuItem) {
        int id = menuItem.getItemId();
        if(menuItem.getTitle().toString().equals("Bundle")){
            if(versionList.size() <= 0){
                if(!isFileExistInDevice(this)){
                    Intent newconnectionIntent = new Intent(this, NewConnectionActivity.class);
                    startActivityForResult(newconnectionIntent, 2);
                    return true;
                }
            }
                Intent listactivity = new Intent(this, ListConnectionActivity.class);
                startActivityForResult(listactivity, 2);
        }
        if (getMenuContext() == null) return false;
        if(menuItem.getTitle().toString().equals("Item")){
            WritableMap params = Arguments.createMap();
            getMenuContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("showItem",params);
        }
        else if(menuItem.getTitle().toString().equals("Rack")){
            WritableMap params = Arguments.createMap();
            getMenuContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("showRack",params);
        }
        else if(menuItem.getTitle().toString().equals("Commision")){
            WritableMap params = Arguments.createMap();
            getMenuContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("showCommission",params);
        }
        else if(menuItem.getTitle().toString().equals("Utilitie.3s")){
            WritableMap params = Arguments.createMap();
            getMenuContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("showUtilities",params);
        }
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }

    @Override
    public void onBackPressed() {
        isHomeScreen();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if(!versionList.isEmpty()){
            try {
                FileUtil.addConnectIonListToFile(getBaseContext(),versionList);
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
    }

    @Override
    protected void refreshFragment() {

    }

    @Override
    protected void onStart() {
        super.onStart();
            super.onStart();
            if(updater == null) {
                updater = getBundleManager(getApplicationContext());

            }
            updater.setParentActivity(this);

    }

    /*
      * Any activity that uses the ReactFragment or ReactActivty
      * Needs to call onHostPause() on the ReactInstanceManager
      */
    @Override
    protected void onPause() {
        super.onPause();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostPause();
        }
    }

    /*
     * Same as onPause - need to call onHostResume
     * on our ReactInstanceManager
     */
    @Override
    protected void onResume() {
        super.onResume();
        SharedPreferences myPrefs = PreferenceManager.getDefaultSharedPreferences(getBaseContext());

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostResume(this,this);
            }
        if( mReactInstanceManager.getCurrentReactContext() == null)return;

        boolean vibrate = myPrefs.getBoolean("soft_scan_key",true);
        WritableMap params = Arguments.createMap();
        params.putBoolean("softkey",vibrate);
        mReactInstanceManager.getCurrentReactContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("onSoftKeyDisabled",params);

        String workstepId = myPrefs.getString("machineId_length","0");
        WritableMap workStepParams = Arguments.createMap();
        workStepParams.putString("machineId", workstepId);
        mReactInstanceManager.getCurrentReactContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("sendWorkStepId", workStepParams);

    }

    public boolean isHomeScreen() {

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if(drawer.isDrawerOpen(GravityCompat.START)){
            drawer.closeDrawer(GravityCompat.START);
            return true;
        }

        else {
            mReactInstanceManager.onBackPressed();
            return true;
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if(requestCode == 1){
            Bundle dataBundle =  data.getExtras();
            Connection newConnection  = dataBundle.getParcelable("URL");
            versionList.add(newConnection);
        }
        else {
            if (resultCode == Activity.RESULT_OK) {
                Bundle dataBundle = data.getExtras();
                Connection newConnection = dataBundle.getParcelable("URL");
                if (newConnection != null) {
                    versionList.add(newConnection);
                    JSBundleManagerActivity.getBundleManager(getApplicationContext()).setHostnameForRelativeDownloadURLs(newConnection.getConnectionUrl());
                    JSBundleManagerActivity.getBundleManager(getBaseContext()).setUpdateMetadataUrl(newConnection.getConnectionUrl()+"/android/LiScanner/update.json");
                    JSBundleManagerActivity.getBundleManager(getBaseContext()).setmAppName("LiScanner");
                    JSBundleManagerActivity.getBundleManager(getApplicationContext()).checkForUpdates();
                }
            }
        }
    }
    public void initializeDynamicMenu() {
        if(!menuString.isEmpty()){
            NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);

            MenuItem myMoveGroupItem = navigationView.getMenu().findItem(R.id.dynamic);
            SubMenu subMenu = myMoveGroupItem.getSubMenu();
            subMenu.clear();

            int itmId = 1;
            int j = 0;
            for (String itmText: menuString) {
                if(j==0) {
                    j++;
                    continue;                                  //to skip header
                }
                subMenu.add(myMoveGroupItem.getGroupId(),itmId,myMoveGroupItem.getOrder(),itmText);
            }
            MenuModule.isAlreadyCalled = true;
        }
        menuString.clear();
    }
}
