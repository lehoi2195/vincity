using ReactNative;
using ReactNative.Modules.Core;
using RNDeviceInfo;
using ReactNative.Shell;
using System.Collections.Generic;

namespace VinhomesOceanPark
{
    class MainReactNativeHost : ReactNativeHost
    {
        public override string MainComponentName => "VinhomesOceanPark";

#if !BUNDLE || DEBUG
        public override bool UseDeveloperSupport => true;
#else
        public override bool UseDeveloperSupport => false;
#endif

        protected override string JavaScriptMainModuleName => "index";

#if BUNDLE
        protected override string JavaScriptBundleFile => "ms-appx:///ReactAssets/index.windows.bundle";
#endif

        protected override List<IReactPackage> Packages => new List<IReactPackage>
        {
            new MainReactPackage(),
            new RNDeviceInfoPackage()
        };
    }
}
