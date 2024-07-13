# Sandbox Asset Workflow

## Table of Contents

1. [Creating a new Sandbox Asset](#creating-a-new-sandbox-asset)
2. [Creating a Task Node for Sandbox Assets](#creating-a-task-node-for-sandbox-assets)
3. [The Finished Feature](#the-finished-feature)

## Creating a new Sandbox Asset

### 1. Create the Base Class

1. Choose `BP_SandboxAssetMaster` as the parent class.
   - This is the lowest level class with all required functionality.
   ![](/1%20-%20SandboxAssetWorkflow.png)

2. Place the new class in the root `SandboxAssetClasses` directory.
   - This directory is for all base classes meant to be inherited from.
   ![](/2%20-%20SandboxAssetWorkflow.png)

3. Make the class abstract.
   - We don't want to use this parent class directly in-game.
   ![](/3%20-%20SandboxAssetWorkflow.png)

4. Assign a unique Asset Manager ID.
   - Must be unique and without spaces.
   ![](/4%20-%20SandboxAssetWorkflow.png)

### 2. Implement Light Functionality

5. Create the logic to operate the light.
   - Implement in the parent class for use by other light classes.
   - Create a `ToggleLight` function (not implemented in master class).
   - Implement `CallSandboxEvent` for script node calls.
   ![](/5%20-%20SandboxAssetWorkflow.png)

### 3. Create the Specific Light Asset

6. Create a new directory for the new SandboxAsset classes.
   ![](/6%20-%20SandboxAssetWorkflow.png)

7. Create a new sandbox asset class inheriting from `BP_SA_LightSource_Master`.
   ![](/7%20-%20SandboxAssetWorkflow.png)
   ![](/8%20-%20SandboxAssetWorkflow.png)

8. Fill out the defaults:
   - Set Sandbox metadata (used in frontend features and queries).
   - Add the Lights script library to enable targeted nodes.
   ![](/9%20-%20SandboxAssetWorkflow.png)

9. Add a point light component.
   ![](/10%20-%20SandboxAssetWorkflow.png)

10. Set its default visibility to false.
    ![](/11%20-%20SandboxAssetWorkflow.png)

11. Override the parent's `ToggleLight` event to toggle visibility.
    ![](/12%20-%20SandboxAssetWorkflow.png)

**Note:** This completes the sandbox asset implementation. Next, we'll create a task to toggle the light visibility.

## Creating a Task Node for Sandbox Assets

### 1. Set Up the Task Node

1. Create a new directory in OpenLogic for the lights objects class.
   ![](/13%20-%20SandboxAssetWorkflow.png)

2. Create the task object, inheriting from `OLT_Master`.
   ![](/14%20-%20SandboxAssetWorkflow.png)

3. Disable tick (we won't be using it for this task).
   ![](/15%20-%20SandboxAssetWorkflow.png)

### 2. Configure Node Properties

4. Create a new node category gameplay tag.
   - Use the `DT_NodeCategories` table.
   - The node category is required for correct mapping in the node browser.
   ![](/16%20-%20SandboxAssetWorkflow.png)

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
   ![](/17%20-%20SandboxAssetWorkflow.png)

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
   ![](/18%20-%20SandboxAssetWorkflow.png)

7. Override `GetInputPinDefaults` for the target pin:
   - Set `BP_SA_LightSource_Master` as the default value
   - Set pin type as SoftObject, single, and PinID 2
   ![](/19%20-%20SandboxAssetWorkflow.png)

8. Override `GetRequiredClass`:
   - This helps node browsers determine which nodes to show when context-sensitive
   - Use the same master class created for lights
   ![](/20%20-%20SandboxAssetWorkflow.png)

### 4. Update Data Tables

9. Refresh data tables storing cached information:
   - Run `EUW_ScriptiongDebugPanel`
   - Trigger both batch operations to refresh entire tables
   - This ensures content can be queried correctly
   ![](/21%20-%20SandboxAssetWorkflow.png)

## The Finished Feature

![](/Sandbox_Light_Script.gif)

##Test
