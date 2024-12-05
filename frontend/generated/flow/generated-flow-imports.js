import '@vaadin/polymer-legacy-adapter/style-modules.js';
import '@vaadin/app-layout/theme/lumo/vaadin-app-layout.js';
import '@vaadin/tooltip/theme/lumo/vaadin-tooltip.js';
import '@vaadin/button/theme/lumo/vaadin-button.js';
import 'Frontend/generated/jar-resources/buttonFunctions.js';
import '@vaadin/vertical-layout/theme/lumo/vaadin-vertical-layout.js';
import '@vaadin/login/theme/lumo/vaadin-login-form.js';
import '@vaadin/icon/theme/lumo/vaadin-icon.js';
import '@vaadin/horizontal-layout/theme/lumo/vaadin-horizontal-layout.js';
import '@vaadin/tabs/theme/lumo/vaadin-tab.js';
import '@vaadin/form-layout/theme/lumo/vaadin-form-layout.js';
import '@vaadin/app-layout/theme/lumo/vaadin-drawer-toggle.js';
import '@vaadin/tabsheet/theme/lumo/vaadin-tabsheet.js';
import '@vaadin/avatar/theme/lumo/vaadin-avatar.js';
import '@vaadin/details/theme/lumo/vaadin-details.js';
import '@vaadin/dialog/theme/lumo/vaadin-dialog.js';
import 'Frontend/generated/jar-resources/flow-component-renderer.js';
import '@vaadin/form-layout/theme/lumo/vaadin-form-item.js';
import '@vaadin/icons/vaadin-iconset.js';
import '@vaadin/tabs/theme/lumo/vaadin-tabs.js';
import '@vaadin/notification/theme/lumo/vaadin-notification.js';
import '@vaadin/common-frontend/ConnectionIndicator.js';
import '@vaadin/vaadin-lumo-styles/color-global.js';
import '@vaadin/vaadin-lumo-styles/typography-global.js';
import '@vaadin/vaadin-lumo-styles/sizing.js';
import '@vaadin/vaadin-lumo-styles/spacing.js';
import '@vaadin/vaadin-lumo-styles/style.js';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset.js';

const loadOnDemand = (key) => {
  const pending = [];
  if (key === '9a298b6920bd7db978af40c27edcd5c1fe087145682dcb8a95abaf66ab99e6f6') {
    pending.push(import('./chunks/chunk-b313962cf2adce7d6ebbea34dede5643645c5035b3c07029e3517e64b617abee.js'));
  }
  if (key === 'd97ceeffcdade971d6301c42d30b68623a9f9fe7d74834d698cbf4f59c2df8f7') {
    pending.push(import('./chunks/chunk-573d9a5dcc28f6052283a7d1aa30bc2a64bfea38546ea31eab4943e94325207f.js'));
  }
  if (key === '2ec5b5326a3142903db5bb3cb0c784dff5c68e723e88e0f11783bfb4d86456df') {
    pending.push(import('./chunks/chunk-08ce28c2c412be67644c7166b1e8d302f523fda221b2ff9869e777d31c169aea.js'));
  }
  if (key === 'b3b82b241c25f110f18ac06d2ec49e6ebd01250bdb901af7cc3196275ee17ab5') {
    pending.push(import('./chunks/chunk-9eeeb0ee700ae3dc8525d4f9a9184ff22e776863435b1e37f4418704936c45a4.js'));
  }
  if (key === '22fa89c97df14f3ed2c1e7f792a282267eb174d59d7cc2951cbd465ef827dc0d') {
    pending.push(import('./chunks/chunk-54fd50a0e86606ec19cbcf0442591c0312802492c38e7907735c6c66095e886f.js'));
  }
  if (key === '08267cfdd6bb7bd16170ecbcac1bb06985f4fd10ad6258593886da08df81a8d0') {
    pending.push(import('./chunks/chunk-333a3eb3ad1ad26805ef40ff873bbfb61f9227f4c9b64e56b8123c7432a00f03.js'));
  }
  if (key === 'ffd58971becd1544aff68bb1b1da7b5655d0dded960448438834f84988330cd3') {
    pending.push(import('./chunks/chunk-bc9eb40ad8e4cab4d012b044d317fa3633ec4336a468abb1481071bb8671257d.js'));
  }
  if (key === '47dc460e47833ab117c7a5c8a249b144d28c72f032d62f140cb5d2165ef2a92b') {
    pending.push(import('./chunks/chunk-7af66c5fdf5e35ae7f2216718f9cf5858a03989162599495423eb32a5f87d0e1.js'));
  }
  if (key === '90ea3611ec77b146164b2aad5ebadaadfcd6e781aece73f50535f0e47e3c6ad0') {
    pending.push(import('./chunks/chunk-85881e96f324cd861fd650245fa49c8af65c5a2a990ca20f2b7ae77ff4ac371e.js'));
  }
  if (key === 'fd8dcc52dc6d15f524c5c372164d6d543e41870237706e8fc9931191fa4000df') {
    pending.push(import('./chunks/chunk-b863078246007ecc8e2032d1faae882dfaf68f17a9ddd4ed88632a39a7df2349.js'));
  }
  if (key === '2f7354784cd51a5208e7ea0573e1caaf754f579e448b8c3c9398baf5745f9658') {
    pending.push(import('./chunks/chunk-bc9eb40ad8e4cab4d012b044d317fa3633ec4336a468abb1481071bb8671257d.js'));
  }
  if (key === '631729b6c10941a3572edaa63e956e38b31a61af2e47dba069a09e34797b0cbc') {
    pending.push(import('./chunks/chunk-13965497deec30fcdc8d1d239a1746faf7242f81bfbff44348256604bbfc7771.js'));
  }
  if (key === '24221912d0e3155fc82da3681aec3d29b43e2fb3c1bdb2c4926483bec5f8182c') {
    pending.push(import('./chunks/chunk-85881e96f324cd861fd650245fa49c8af65c5a2a990ca20f2b7ae77ff4ac371e.js'));
  }
  if (key === '2b6df6fa4d9520374b1047a067348eb64cc2cfc542c174292320e9f9a2910a11') {
    pending.push(import('./chunks/chunk-eb43a11b31864c24bc9b47d774fdb06df2493e407c9e4166d55371e41470fd35.js'));
  }
  if (key === '9cae3494fdd6015b72c57929495d90010203f02d088453db89f3caaf0eea96b4') {
    pending.push(import('./chunks/chunk-85881e96f324cd861fd650245fa49c8af65c5a2a990ca20f2b7ae77ff4ac371e.js'));
  }
  if (key === '18aad364e9d9de31834ce9ac976d7f431d4429740d08dad7123198fe1c30e67f') {
    pending.push(import('./chunks/chunk-bc9eb40ad8e4cab4d012b044d317fa3633ec4336a468abb1481071bb8671257d.js'));
  }
  if (key === '9943c0e35f42767b11845c53308bc41a5a9e12dfe7551b6c28c6817c86f28959') {
    pending.push(import('./chunks/chunk-e1bca8d53443e3cd4fa84413bb2e3f9ab47c80e046c6780b1677c2b13ac6f1a0.js'));
  }
  if (key === '8e519ce7139d4ab0036ab0e09199ca3c19f60ceb3d1fa504cc78cbd859338637') {
    pending.push(import('./chunks/chunk-8870bd2cdc9aaf066ee9464a9c49700ee91513f81c6ac3b1c30150281c6b2299.js'));
  }
  if (key === '1ff2ff082504d9e1e35cb3fc8d201f9aa06b8362d1cf518b20dbd15d31a28191') {
    pending.push(import('./chunks/chunk-d43538c033df84091d770819dc03e2a4b993bfeb8a17d7c79eb70c818346284e.js'));
  }
  if (key === 'bb4414f9333800a4977f45cf003b74294cf2a936efbabd63cea2b5d7f33948de') {
    pending.push(import('./chunks/chunk-cc02fb39656c6cbccd5c6844de56c009261483d2c85ae9f6afea1c559eff3775.js'));
  }
  if (key === 'b6745d4114a4e1acbcd854c4c16deda16136610ce316f360831b7d60a670d04c') {
    pending.push(import('./chunks/chunk-89e21f9b75bb7880184266aac7c2703ecfdda2258acd1e46d1fb8d31c6f5f35d.js'));
  }
  if (key === 'dc3e7c62616a540506c2336a297ffd9adedcd08fac2bccd9102be397424e1afe') {
    pending.push(import('./chunks/chunk-c8fda5926ff9474ffda5310d87149918387e6244b700b6297606ecdc6ab37022.js'));
  }
  if (key === '05beb7af9324e7a1af3dfa2fe006e34d4bedd53d93791b5932b592b05fd53968') {
    pending.push(import('./chunks/chunk-b313962cf2adce7d6ebbea34dede5643645c5035b3c07029e3517e64b617abee.js'));
  }
  if (key === 'b27dfad03b98fe8c273967966997c0b2b8339b253f8733f3686ee76247ce578d') {
    pending.push(import('./chunks/chunk-756b996080a20aa044470334ccc8fc2bec9f20b8d85b2bb652f9489d4a5b03a4.js'));
  }
  if (key === 'a90147152210a667bd9306c4dce38d9c3fa38c63327784570d48c6f22714aa2c') {
    pending.push(import('./chunks/chunk-85881e96f324cd861fd650245fa49c8af65c5a2a990ca20f2b7ae77ff4ac371e.js'));
  }
  if (key === '11b38d9e2a8d07426e8162b094d57925ec4155ba51563cc18c008f43e513a1d9') {
    pending.push(import('./chunks/chunk-b863078246007ecc8e2032d1faae882dfaf68f17a9ddd4ed88632a39a7df2349.js'));
  }
  if (key === 'b96032288dcf52e0f81061cfc7d1ae5fb2b5ad0c15b33b5d81a0bc4f2c9664fe') {
    pending.push(import('./chunks/chunk-6d1c452cd43ecec9f52f336f0d7a115fa4e61ddab991133ab810c9137d697eee.js'));
  }
  if (key === '1e17efd452fe2c51196df1e167faa9f4ecf1d60a383592c6710658fe41e78fcb') {
    pending.push(import('./chunks/chunk-b863078246007ecc8e2032d1faae882dfaf68f17a9ddd4ed88632a39a7df2349.js'));
  }
  if (key === '9a9497e71435eaa80da92b371cf921f1217a504a1c5e04efb6b094ed2fcb93ce') {
    pending.push(import('./chunks/chunk-63bbb17c7be0dc2f174016d512015259393085919d086d172d694fa0dabe5942.js'));
  }
  if (key === '9c7653d8267014a8e6c483f675221c72397b233c1a7b89989209c112fe0c81f5') {
    pending.push(import('./chunks/chunk-7ca2b3c7b6664f149c75f9bb36045239986ddaf1acb9b64feb2e52d63e5c9de6.js'));
  }
  if (key === 'd1178b8fcf71e9479f76ecfc3ae52fbcb67c0c16906ad865d328421eb7a94848') {
    pending.push(import('./chunks/chunk-85881e96f324cd861fd650245fa49c8af65c5a2a990ca20f2b7ae77ff4ac371e.js'));
  }
  if (key === '7c75c34df8ffcc9bdb03540e1233724402798ed2ff49e1d82f857d2ad621e739') {
    pending.push(import('./chunks/chunk-08ce28c2c412be67644c7166b1e8d302f523fda221b2ff9869e777d31c169aea.js'));
  }
  if (key === 'ba1a3989098dc870c994794e58782eaf5d9bd44ecd4225cf489f42fa0d2701e5') {
    pending.push(import('./chunks/chunk-dc6e3f2625c1847e61c7e2eebd022d49d71ddf3f44400e3cc50b3279c6819c8a.js'));
  }
  if (key === '008520049dbd131f07bf9699b5fac7d0935258a59afa69bf4e60b9ee43d6722e') {
    pending.push(import('./chunks/chunk-9fa16e1580277d43ca04d0b82e02264809c8de267411dd1febca3391bf6f7d4e.js'));
  }
  if (key === '571bf6ec31b310eaa45338d749d357968d7cff1910a739a13007007e1f6f8c8d') {
    pending.push(import('./chunks/chunk-65bc32496038a666861224079fbf077e7fab86c46e9f084b563dfb762bbe28fd.js'));
  }
  if (key === '6768a259eb8b5e46cdf0969de2d27441762283dbf07aefd11002e20b3f219507') {
    pending.push(import('./chunks/chunk-b313962cf2adce7d6ebbea34dede5643645c5035b3c07029e3517e64b617abee.js'));
  }
  if (key === '382e9a4a353007159eb6d8c5a9e7584b3062170b677fd3c5e6e328ba823725c9') {
    pending.push(import('./chunks/chunk-85881e96f324cd861fd650245fa49c8af65c5a2a990ca20f2b7ae77ff4ac371e.js'));
  }
  if (key === '0743443b66412c59f46a347d4d191cc13f27c70756aced988c67f13f0780d9cd') {
    pending.push(import('./chunks/chunk-8fe105a87d66a6ae5f37243be06d72526d6f99481482a450bf5a0a616df7529a.js'));
  }
  if (key === 'e6d614d5e746a1a178a56da1961dd05505410e6fd837b08d5a4ecdcbfe0d6cf2') {
    pending.push(import('./chunks/chunk-8a0e4cc42d2c36ebf20bdd271850d0ca51ce25c2fad28fc8e4eb50cdacf684a6.js'));
  }
  if (key === '16d0a5b3cc0e2116edf3e813beb96ec073a7cd728496711e3aa707c9fcc379d1') {
    pending.push(import('./chunks/chunk-85881e96f324cd861fd650245fa49c8af65c5a2a990ca20f2b7ae77ff4ac371e.js'));
  }
  if (key === '9c7895591e7a0e2d28f64c011e6b534a329fddd7748930b4e2486e2ba51016b2') {
    pending.push(import('./chunks/chunk-72127da3aeeb082c819965995309c20d361dd88bf9544a7e348ffd6e35eec0bd.js'));
  }
  if (key === '622d7d27cd3c2fd0f540eb3fac88db728d1593c7678a53bd7b71cab193662d9d') {
    pending.push(import('./chunks/chunk-fdfe1eb21ca393cf187d9c45809fdfa1f0ec9d9e3a9cf87cba6a68c75182ccb4.js'));
  }
  if (key === '7270969d8d1ec0fbe8c6420f608467e0aac58daf4f600ed686fe0b151895298b') {
    pending.push(import('./chunks/chunk-8bb4d56a37a7a6ef9ef730083b96aeb1c86936928eafc0d30a15ecb7607ec31f.js'));
  }
  if (key === 'ec4d318f7a779e191ee4bddf8d32cc52257d4f7a8f490206fddd729d22cc4445') {
    pending.push(import('./chunks/chunk-b863078246007ecc8e2032d1faae882dfaf68f17a9ddd4ed88632a39a7df2349.js'));
  }
  if (key === 'bbcfa373d4d01128713d00d00b13b00e417dcee8120ed60c6727214ffd639dd3') {
    pending.push(import('./chunks/chunk-bc9eb40ad8e4cab4d012b044d317fa3633ec4336a468abb1481071bb8671257d.js'));
  }
  if (key === '183a54bb88d1ee96fd887d33ba3a26c5011672a735e05e9285df2010b47cc0e4') {
    pending.push(import('./chunks/chunk-2009fcc926b699343072b3fde06de404c21a5946210e980283540840a233c250.js'));
  }
  if (key === '4316c09afe17554314296984fe37f40a0a49aea07ac9f93487aa5d00e5bdba85') {
    pending.push(import('./chunks/chunk-85881e96f324cd861fd650245fa49c8af65c5a2a990ca20f2b7ae77ff4ac371e.js'));
  }
  if (key === '3db3d328a89b179a7e2a195abebf65067d4f4b0c24e2cc043acad675a960a254') {
    pending.push(import('./chunks/chunk-85881e96f324cd861fd650245fa49c8af65c5a2a990ca20f2b7ae77ff4ac371e.js'));
  }
  if (key === '8fe7df8620ecc167368a5ec1cbb951094b615cd23c8cc66ecfc8c03f7588dd69') {
    pending.push(import('./chunks/chunk-10f45f75e17a41fcca43b2bab62e6790fa0144c91c2e47cc16f143145f139d98.js'));
  }
  if (key === 'd32792b75d96b8af1cbe59909547f7726bbb1dde90739c9a9a2ceb092d8f3877') {
    pending.push(import('./chunks/chunk-348f88f857559a1a22a486fee2400ca1a486767b3528506a39ed1e4caf93f16b.js'));
  }
  if (key === '26fd4a1e5e7d932696a44a102467fe3b9471e9a1caca732cff8226eb1d18ce00') {
    pending.push(import('./chunks/chunk-cd489cf16e734227e56e456646f3b1b408d29a96b52faade5567d60f16c8c5d0.js'));
  }
  if (key === '72e4c70e47b271457b987293d4bc149df7122253b4b24fabf8fc45e2a0b34a4a') {
    pending.push(import('./chunks/chunk-bc9eb40ad8e4cab4d012b044d317fa3633ec4336a468abb1481071bb8671257d.js'));
  }
  if (key === 'd504275c7a35cbf1375425f07df47b962fb07dde71185abd527381a968f01733') {
    pending.push(import('./chunks/chunk-bc9eb40ad8e4cab4d012b044d317fa3633ec4336a468abb1481071bb8671257d.js'));
  }
  if (key === '4d34ba2c9ddf1d21ef86b32aec2440edf777cbe50b545b76116774adc2856c5e') {
    pending.push(import('./chunks/chunk-65bc32496038a666861224079fbf077e7fab86c46e9f084b563dfb762bbe28fd.js'));
  }
  if (key === '11dda3b65d38f96c682f371dd42c59e816f939ef34f5bbc85198525402e6228e') {
    pending.push(import('./chunks/chunk-8a0e4cc42d2c36ebf20bdd271850d0ca51ce25c2fad28fc8e4eb50cdacf684a6.js'));
  }
  if (key === '704fff2317451f561b7948336df41abcc3881f6ea4e1a97469f7c9c8153c3249') {
    pending.push(import('./chunks/chunk-08ce28c2c412be67644c7166b1e8d302f523fda221b2ff9869e777d31c169aea.js'));
  }
  if (key === '52de5fb6d97a38a1bade823c9a40621c9dfd2ea30e068d613addb8fa9fc734e4') {
    pending.push(import('./chunks/chunk-6d4880eeb5b4b988faab364ecf54f711a4d43e720ab632c62cd70d5f4877f3ea.js'));
  }
  if (key === '428bb0a21e385aa76bfb67a906da7f958f02da2dfc32e89a57809133d885720a') {
    pending.push(import('./chunks/chunk-d5deb397bb63d8bebed3bd8063b1fc8c2d47667fe76f9e93acd47f5c17f71582.js'));
  }
  if (key === '1791421a13b6851f30d6c0ea1d5f1ee8e81ecdaed920d838e12d07a48c5d8989') {
    pending.push(import('./chunks/chunk-422c3a2ad42cb7c26cccff5ea772b37973c9526da5f9baabc6ba2b82c6284122.js'));
  }
  if (key === '4858f048786bec055b7a09004c4886a30b76415b95bfa387ae009f4318bd51e9') {
    pending.push(import('./chunks/chunk-bfe6b08e2a67901f655e1bf22e2ec43d80bf074d0577830faf9d1aafd22aaa27.js'));
  }
  return Promise.all(pending);
}

window.Vaadin = window.Vaadin || {};
window.Vaadin.Flow = window.Vaadin.Flow || {};
window.Vaadin.Flow.loadOnDemand = loadOnDemand;
window.Vaadin.Flow.resetFocus = () => {
 let ae=document.activeElement;
 while(ae&&ae.shadowRoot) ae = ae.shadowRoot.activeElement;
 return !ae || ae.blur() || ae.focus() || true;
}