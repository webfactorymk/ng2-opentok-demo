# OpentokNg2Demo
This is a demo application where you can see how ng2-opentok is used. The project supports video and text chat between two entities.

## Making a video call

To make a video call open two tabs:
  * Caller tab `http://localhost:4200/caller`
 
    ![caller-sc1](https://user-images.githubusercontent.com/4194546/33480016-9d64ff04-d68f-11e7-98bb-3ae7d1199af1.png)

  * Recepient tab `http://localhost:4200/recepient`
 
    ![recepient sc1](https://user-images.githubusercontent.com/4194546/33479739-7f81d51c-d68e-11e7-811e-390cf09bef32.png)

You can use the two views to test:

 * #### making/ending a video call
  
  Calling
  
![caller-sc2](https://user-images.githubusercontent.com/4194546/33479780-a6b8dd88-d68e-11e7-8341-8c56af080322.png)
![recepient-sc2](https://user-images.githubusercontent.com/4194546/33479798-b6ad33a6-d68e-11e7-8000-9f4199a076e9.png)

------- 

Established call

![caller sc 3](https://user-images.githubusercontent.com/4194546/33479816-c6bbee72-d68e-11e7-945c-0088e489f47f.png)
![rec sc 3](https://user-images.githubusercontent.com/4194546/33479820-c869f55c-d68e-11e7-80e3-e55efcd63709.png)

* #### send text message to the other user

![caller sc 4](https://user-images.githubusercontent.com/4194546/33479854-f18df4c4-d68e-11e7-9b01-a70b82fd4454.png)

![rec sc 4](https://user-images.githubusercontent.com/4194546/33479863-f6d7d24c-d68e-11e7-8c16-d48c54f99ef2.png)

* #### get a sceenshot from the other user

![screenshot buddy 5](https://user-images.githubusercontent.com/4194546/33479912-2cc8a890-d68f-11e7-8af6-0d211bdb3417.png)

 * #### add/remove your video stream
 
 ![rc remove video](https://user-images.githubusercontent.com/4194546/33479979-7251af9c-d68f-11e7-8211-d354f17d5a29.png)
![caller removce video st](https://user-images.githubusercontent.com/4194546/33479978-6fdd2732-d68f-11e7-9e7a-7bff8926e518.png)

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
