# Sandbox Asset Workflow

## Table of Contents

1. [Creating a new Sandbox Asset](#creating-a-new-sandbox-asset)
2. [Creating a Task Node for Sandbox Assets](#creating-a-task-node-for-sandbox-assets)
3. [The Finished Feature](#the-finished-feature)

## Creating a new Sandbox Asset

### 1. Create the Base Class

1. Choose `BP_SandboxAssetMaster` as the parent class.
   - This is the lowest level class with all required functionality.
   ![](/1_SAWF.webp)

2. Place the new class in the root `SandboxAssetClasses` directory.
   - This directory is for all base classes meant to be inherited from.
   ![](/2_SAWF.webp)

3. Make the class abstract.
   - We don't want to use this parent class directly in-game.
   ![](/3_SAWF.webp)

4. Assign a unique Asset Manager ID.
   - Must be unique and without spaces.
   ![](/25_SAWF.webp)

### 2. Implement Light Functionality

5. Create the logic to operate the light.
   - Implement in the parent class for use by other light classes.
   - Create a `ToggleLight` function (not implemented in master class).
   - Implement `CallSandboxEvent` for script node calls.
   ![](/15_SAWF.webp)

### 3. Create the Specific Light Asset

6. Create a new directory for the new SandboxAsset classes.
   ![](/4_SAWF.webp)

7. Create a new sandbox asset class inheriting from `BP_SA_LightSource_Master`.
   ![](/5_SAWF.webp)
   ![](/6_SAWF.webp)

8. Fill out the defaults:
   - Set Sandbox metadata (used in frontend features and queries).
   - Add the Lights script library to enable targeted nodes.
   ![](/12_SAWF.webp)

9. Add a point light component.
   ![](/23_SAWF.webp)

10. Set its default visibility to false.
    ![](/24_SAWF.webp)

11. Override the parent's `ToggleLight` event to toggle visibility.
    ![](/16_SAWF.webp)

::: info
**Note:** This completes the sandbox asset implementation. Next, we'll create a task to toggle the light visibility.
:::

## Creating a Task Node for Sandbox Assets

### 1. Set Up the Task Node

1. Create a new directory in OpenLogic for the lights objects class.
   ![](/7_SAWF.webp)

2. Create the task object, inheriting from `OLT_Master`.
   ![](/8_SAWF.webp)

3. Disable tick (we won't be using it for this task).
   ![](/9_SAWF.webp)

### 2. Configure Node Properties

4. Create a new node category gameplay tag.
   - Use the `DT_NodeCategories` table.
   - The node category is required for correct mapping in the node browser.
   ![](/10_SAWF.webp)

5. Fill out the task defaults:
   - Name it "Toggle Light"
   - Provide a description
   - Set the category
   - Leave node widget as `WBP_OpenLogicDefaultNode`
   - Set up inputs and outputs:
     - 1 input execution
     - 1 output execution
     - 1 target object
     - 1 boolean
   ![](/13_SAWF.webp)

### 3. Implement Node Logic

6. Create the node's logic:
   - Always call the parent `OnTaskBegin` function
   - Use `GetConnectionObject` for object inputs
   - Use `ReportPinAccessError` and `ClearAllPinAccessErrors` for error feedback
   - Use `GetInputBool` for the 'TurnOn' boolean
   - Use `CallSandboxAssetEvent` to call events on sandbox assets
   - Use `CallFlowPinExecute` for visual execution animation
   - Use `CallOutputPin` to trigger connected output execution
   - Call `CompleteTask` to end the node's execution
   ![](/14_SAWF.webp)

7. Override `GetInputPinDefaults` for the target pin:
   - Set `BP_SA_LightSource_Master` as the default value
   - Set pin type as SoftObject, single, and PinID 2
   ![](/20_SAWF.webp)

8. Override `GetRequiredClass`:
   - This helps node browsers determine which nodes to show when context-sensitive
   - Use the same master class created for lights
   ![](/21_SAWF.webp)

### 4. Update Data Tables

9. Refresh data tables storing cached information:
   - Run `EUW_ScriptiongDebugPanel`
   - Trigger both batch operations to refresh entire tables
   - This ensures content can be queried correctly
   ![](/17_SAWF.webp)

## The Finished Feature

![](/Sandbox_Light_Script.gif)